const drinkModel = require('../models/drink');
const UserModel = require('../models/user');

exports.getDrinksForOrder = function (req, res) {
    var cat = req.params.category;
    var category;
    
    if (cat == "espresso") {
        category = "Espresso";
    } else if (cat == "chocolate") {
        category = "Chocolate"
    } else if (cat == "frappuccino") {
        category = "Frappuccino"
    } else if (cat == "coffee-craft") {
        category = "Coffee Craft"
    } else if (cat == "teavana-teas") {
        category = "Teavana Teas"
    }  
    
    drinkModel.getDrinksByCategory({category: category}, {name: 1} , function(drinks) {
        UserModel.getUser({fullname: "Frances Lopez"}, function(user) {
            res.render('menu',  { 
                title: `${category} - Order Menu`, 
                layout: 'menu-layout',
                isAdmin: false,
                loggedIn: true,
                loc: 'Order',
                category: category,
                drinks: drinks,
                js: 'order.js',
                user: user
            });
        }) 
        // console.log("drinks are: " + drinks);
    })
};

exports.getDrinksForUpdate = function (req, res) {
    var cat = req.params.category;
    var category;
    
    if (cat == "espresso") {
        category = "Espresso";
    } else if (cat == "chocolate") {
        category = "Chocolate"
    } else if (cat == "frappuccino") {
        category = "Frappuccino"
    } else if (cat == "coffee-craft") {
        category = "Coffee Craft"
    } else if (cat == "teavana-teas") {
        category = "Teavana Teas"
    }  
    
    UserModel.getUser({fullname: "Admin"}, function(user) {
        drinkModel.getDrinksByCategory({category: category}, {name: 1} , function(drinks) {
        
            res.render('menu',  { 
                title: `${category} - Update Menu`, 
                layout: 'menu-layout',
                loc: 'Update Menu',
                isAdmin: true,
                loggedIn: true,
                category: category,
                js: 'menu.js',
                drinks: drinks,
                user: user
            });
            // console.log("drinks are: " + drinks);
        })
    });

};