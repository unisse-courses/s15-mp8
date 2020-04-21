const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

const DrinkModel = require('../models/drink');
const UserModel = require('../models/user');
const PricesModel = require('../models/pricelist')

const Drink = mongoose.model('Drink');
const Prices = mongoose.model('Prices');


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
    
    DrinkModel.getDrinksByCategory({category: category}, {name: 1} , function(drinks) {
        UserModel.getUser({_id: req.session.user}, function(err, user) {
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
    
    UserModel.getUser({_id: req.session.user}, function(err, user) {
        DrinkModel.getDrinksByCategory({category: category}, {name: 1} , function(drinks) {
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
        })
    });
};

exports.addDrink = function (req, res, next) {
        var newDrink = new Drink ();
        var pricelist = new Prices ();

        pricelist.tall = req.body.tallPrice;
        pricelist.grande = req.body.grandePrice;
        pricelist.venti = req.body.ventiPrice;
        
        console.log(newDrink);

        PricesModel.create(pricelist, function(err, pricelist){
            newDrink._id = new mongoose.Types.ObjectId();
            newDrink.name = req.body.drinkName;
            newDrink.pricelist = pricelist;
            newDrink.category = req.body.category;
            var tempPic = req.file.path;
            newDrink.picture = tempPic.substring(7, tempPic.length);

            DrinkModel.create(newDrink, function(err, drink) {
                if (!err) {
                    res.status(200).send({status: "ok"})
                    console.log("drink created!");
                }
                    
                else {
                    res.status(200).send({status: "error"})
                    console.log("err in creating drink: " + err);
                }
                    
            })
        })

        var url = req.body.category;

        // if (url == "Espresso")
        //     url = "espresso";
        // else if (url == "Chocolate")
        //     url = "chocolate";
        // else if (url == "Teavana Teas")
        //     url = "teavana-teas";
        // else if (url == "Frappuccino")
        //     url = "frappuccino";
        // else if (url == "Coffee Craft")
        //     url = "coffee-craft";

        // res.redirect('/admin/menu/update/' + url);
};