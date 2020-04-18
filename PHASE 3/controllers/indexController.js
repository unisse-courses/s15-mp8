const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const UserModel = require('../models/user')
const DrinkModel = require('../models/drink');

const User = mongoose.model('User');

exports.getHomepage = (req, res) => {
    
    //delete documents
    // User.deleteMany({}, function (err) {
    //     if(err) console.log(err);
    //     console.log("Successful deletion");
    //   });

    //count documents
    // userModel.countDocuments({}, function( err, count){
    //     console.log( "Number of users:", count );
    // })

    // userModel.find({}, function( err, user){
    //     console.log( "user:", user );
    // })
    
    DrinkModel.getNewlyAdded(function(drinks) {
        res.render('homepage',  { 
            title: 'Home - Starbucks Assist', 
            layout: 'home', 
            loggedIn: false,
            isGeneral: true,
            css: ['header-footer.css', 'content-home.css'],
            drinks: drinks
        });
    })
}

exports.registerView = (req, res) => {
    res.render('register',  { 
        title: 'Register - Starbucks Assist', 
        layout: 'home', 
        isRegister: true,
        css: ['header-footer.css', 'content-register.css'] });
};

exports.registerProcess = (req, res) => {
    // console.log("pasok post route");
    // var result;
    // UserModel.checkUser({ emailAddress: req.body.emailAddress }, user => {
    //     if (user.length >= 1) {
    //         result = { success: false, message: "Email already exists!" }
    //         insertUser(req, res, result.success, result.message);
    //     }
    //     else{   
    //         result = { success: true, message: "User created! Please login to access you account." }
    //         insertUser(req, res, result.success, result.message);
    //     }     
    // })

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const { fullname, nickname, emailAdd, phone, pword } = req.body;
        
        console.log(fullname, nickname, emailAdd, phone, pword)

        UserModel.getUser({ emailAddress: emailAdd }, (err, result) => {
            // console.log("result dito is: " + result);
            if (result) {
                console.log(result);
                // found a match, return to login with error
                // console.log("meron na eh")
                req.flash('error_msg', 'User already exists. Please login.');
                res.redirect('/register');
            } else {
        
            const saltRounds = 10;

            // Hash password
            bcrypt.hash(pword, saltRounds, (err, hashed) => {
                const newUser = new User();
                
                newUser._id = new mongoose.Types.ObjectId(),
                newUser.fullname = fullname;
                newUser.nickname = nickname;
                newUser.emailAddress = emailAdd;
                newUser.phone = phone;
                newUser.password = hashed;
                // newUser.displayphoto = "default.png";
                newUser.isAdmin = true;
                
                console.log ("before saving: " + newUser);
                UserModel.create(newUser, (err, user) => {
                    if (err) {
                        console.log("di nagawa")
                        // console.log("req.body " + req.body)
                        req.flash('error_msg', 'Could not create user. Please try again.');
                        res.redirect('/register');

                    // res.status(500).send({ message: "Could not create user"});
                    } else {
                        console.log("nagawa")
                        req.flash('success_msg', 'You are now registered! Please log in.');
                        res.redirect('/register');
                    }
                });
            });
        }
        });
    } else {
        const messages = errors.array().map((item) => item.msg);

        req.flash('error_msg', messages.join(' '));
        res.redirect('/register');
    }
};

exports.loginView = (req, res) => {
    res.render('login',  { 
        title: 'Log In - Starbucks Assist', 
        layout: 'home', 
        isRegister: false,
        css: ['header-footer.css', 'content-register.css'] });
};

exports.login = (req,res) => {
    // UserModel.getUser({emailAddress: req.body.emailAddress, password: req.body.password}, user => {
    //   if (user == null) {
    //         console.log( "user not found");
    //         result = {success: false, message: "Email or password is incorrect." }
    //         res.send(result);
    //     }
    //     else{   
    //         console.log( "user found:", user);
    //         result = {success: true, isAdmin: user.isAdmin};
    //         res.send(result);
    //     }
    // });

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const {
            emailAdd,
            pword
        } = req.body;

        UserModel.getUser({ emailAddress: emailAdd }, (err, user) => {
        if (err) {
            // Database error occurred...
            req.flash('error_msg', 'Something happened! Please try again.');
            res.redirect('/login');
        } else {
            // Successful query
            if (user) {
            // User found!
            // Check password with hashed value in the database
            bcrypt.compare(pword, user.password, (err, result) => {
                // passwords match (result == true)
                if (result) {
                // Update session object once matched!
                    req.session.user = user._id;
                    req.session.isAdmin = user.isAdmin;

                    console.log(req.session);
                    
                    if (user.isAdmin)
                        res.redirect('/admin/home');
                    else
                        res.redirect('/customer/home');

                } else {
                    // passwords don't match
                    req.flash('error_msg', 'Incorrect password. Please try again.');
                    //gawa login page
                    res.redirect('/login');
                }
            });
            } else {
            // No user found
                req.flash('error_msg', 'No registered user with that email. Please register.');
                res.redirect('/login');
            }
        }
        });
    } else {
        const messages = errors.array().map((item) => item.msg);

        req.flash('error_msg', messages.join(' '));
        res.redirect('/');
    }
}

// function insertUser(req, res, success, message) {
//     var user = new User();
//     user._id = new mongoose.Types.ObjectId(),
//     user.fullname = req.body.fullname;
//     user.nickname = req.body.nickname;
//     user.emailAddress = req.body.emailAddress;
//     user.phone = req.body.phone;
//     user.password = req.body.password;
//     user.displayphoto = "default.png";
//     user.isAdmin = false;

//     console.log ("before saving: " + user);

//     if(success) {
//         console.log("1: " + req.body.password + " 2: " + req.body.confirmPass)
//         if (req.body.password == req.body.confirmPass) {
//             UserModel.create(user, (err, user) => {
//                 if (!err) {
//                     console.log('user: ' + user);
//                     result = { success: success, message: message }
//                     res.send(result);
//                 } 
//                 else {
//                     console.log('Error insertUser: ' + err);
//                 }
//             });
//         }
//         else {
//             result = { success: false, message: "Password do not match" }
//             res.send(result);
//         }
//     }
//     else {
//         result = { success: success, message: message}
//         res.send(result);
//     }
// }