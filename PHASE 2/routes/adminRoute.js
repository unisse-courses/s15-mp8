const router = require('express').Router();

//for checking of users only; not important
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/home', (req, res) => {
    res.render('homepage',  {
        title: 'Home - Starbucks Assist', 
        layout: 'home',
        loc: 'Home',
        loggedIn: true,
        css: ['header-footer.css', 'content-home.css'],
        isAdmin: true});
});



module.exports = router;