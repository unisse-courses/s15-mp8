const router = require('express').Router();

//for checking of users only; not important
const mongoose = require('mongoose');

const menuRouter = require("./menuRoute");
const ordersRouter = require("./ordersRoute");

router.get('/home', (req, res) => {
    res.render('homepage',  {
        title: 'Home - Starbucks Assist', 
        layout: 'home',
        loc: 'Home',
        loggedIn: true,
        css: ['header-footer.css', 'content-home.css'],
        isAdmin: true});
});

router.use('/orders', ordersRouter);
router.use('/menu', menuRouter);

module.exports = router;