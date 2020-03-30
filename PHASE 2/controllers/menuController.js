const drinkModel = require('../models/drink');
const priceModel = require('../models/pricelist');

exports.getEspressoDrinks = function (req, res) {
    drinkModel.getDrinksByCategory({category: "Espresso"}, {name: 1} , function(drinks) {
        res.render('menu',  { 
            title: 'Espresso - Order Menu', 
            layout: 'menu-layout',
            isAdmin: false,
            loggedIn: true,
            loc: 'Order',
            category: 'Espresso',
            drinks: drinks
        });
        console.log("drinks are: " + drinks);
    })
};