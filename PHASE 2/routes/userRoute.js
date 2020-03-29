//Require
const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

var router = express.Router();
mongoose.set('useFindAndModify', false);

router.get('/', (req, res) => {
    
    //delete documents
    // User.deleteMany({}, function (err) {
    //     if(err) console.log(err);
    //     console.log("Successful deletion");
    //   });

    //count documents
    User.countDocuments({}, function( err, count){
        console.log( "Number of users:", count );
    })

    User.find({}, function( err, user){
        console.log( "user:", user );
    })

    res.render('homepage',  { 
        title: 'Home - Starbucks Assist', 
        layout: 'home', 
        loggedIn: false,
        css: ['header-footer.css', 'content-home.css'] });
});

router.get('/home-customer', (req, res) => {
    User.findOne().sort({$natural: -1}).limit(1).exec((err, docs) => {
        if(!err) {
            res.render('homepage', {
                user: docs,
                title: 'Home - Starbucks Assist', 
                layout: 'home', 
                loc: 'Home',
                loggedIn: true,
                css: ['header-footer.css', 'content-home.css']
            })

        } else {
            console.log('Error in user: ' + err);
        }
    });
    
    // User.find((err, docs) => {
    //     if(!err) {
    //         res.render('homepage', {
    //             user: docs,
    //             nickname: docs.nickname,
    //             title: 'Home - Starbucks Assist', 
    //             layout: 'home', 
    //             loc: 'Home',
    //             loggedIn: true,
    //             css: ['header-footer.css', 'content-home.css']
    //         })
    //     } else {
    //         console.log('Error in user: ' + err);
    //     }
    // });
});

//NO ERROR CHECKING YET (i.e. pass1 == pass2, email(unique & right syntax), phonenum)
router.post('/addUser', (req, res) => {
    var result;
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            console.log( "user:", user );
            result = { success: false, message: "Email already exists!" }
            insertUser(req, res, result.success, result.message);
        }
        else{   
            result = { success: true, message: "User created!" }
            insertUser(req, res, result.success, result.message);
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/login', (req,res) => {
    
})

function insertUser(req, res, success, message) {
    var user = new User();
    user._id = new mongoose.Types.ObjectId(),
    user.fullname = req.body.fullname;
    user.nickname = req.body.nickname;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.pass = req.body.pass;
    user.displayphoto = "default.png";
    user.isAdmin = false;

    console.log ("before saving: " + user);

    if(success) {
        user.save((err, doc) => {
            if (!err) {
                console.log('user: ' + user);
                result = { success: success, message: message }
                res.send(result);
            } 
            else {
                 console.log('Error insertUser: ' + err);
            }
        });
    }
    else {
        result = { success: success, message: message}
        res.send(result);
    }
}

module.exports = router;