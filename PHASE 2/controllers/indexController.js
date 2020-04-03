const drinkModel = require('../models/drink');
const userModel = require('../models/user');

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
    
    drinkModel.getNewlyAdded(function(drinks) {
        res.render('homepage',  { 
            title: 'Home - Starbucks Assist', 
            layout: 'home', 
            loggedIn: false,
            js: 'register.js',
            css: ['header-footer.css', 'content-home.css'],
            drinks: drinks
        });
    })
}