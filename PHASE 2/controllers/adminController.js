const DrinkModel = require('../models/drink')
const OrderModel = require('../models/order')

exports.getHomepage = (req, res) => {
    DrinkModel.getNewlyAdded(function(drinks) {
        res.render('homepage',  {
            title: 'Home - Starbucks Assist', 
            layout: 'home',
            loc: 'Home',
            loggedIn: true,
            css: ['header-footer.css', 'content-home.css'],
            isAdmin: true,
            drinks: drinks
        });
    })
}