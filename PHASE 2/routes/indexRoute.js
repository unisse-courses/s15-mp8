const router = require('express').Router();

//for checking of users only; not important
const mongoose = require('mongoose');
const User = mongoose.model('User');

// Home route
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

module.exports = router;