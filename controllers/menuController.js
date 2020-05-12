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
        DrinkModel.getDrink({name: req.body.drinkName}, function(err, drink) {
            if (drink) {
                res.status(200).send({status: "exist"})
                console.log("drink already exist!");
            } else {
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
            }
        })
    
        
};

async function createPricelist(obj) {
    var pricelist = new Prices();

    pricelist._id = obj.priceId;
    pricelist.tall = obj.tall;
    pricelist.grande = obj.grande;
    pricelist.venti = obj.venti;

    return pricelist;
}

async function createDrink (obj, req) {
    var updateDrink = new Drink();

    updateDrink._id = obj.drinkId;
    updateDrink.name = obj.drinkName;

    if(req.file != undefined) {
        var tempPic = req.file.path;
        updateDrink.picture = tempPic.substring(7, tempPic.length);
    }

    return updateDrink;
}

exports.updateDrink = async function (req, res, next) {
    var updateDrink = await createDrink(req.body.updateDrink, req)
    var pricelist = await createPricelist(req.body.pricelist)

    PricesModel.update(pricelist._id, pricelist, function(err, pricelist) {
        DrinkModel.update(updateDrink._id, updateDrink, function(err, drink) {
            if (!err) {
                res.status(200).send({status: "ok"})
                console.log("drink updated!");
            }
                
            else {
                res.status(200).send({status: "error"})
                console.log("err in update drink: " + err);
            }
        })
    })
};

exports.deleteDrink = function (req, res) {
    PricesModel.delete(req.body.priceId, function(err, pricelist) {
        DrinkModel.delete(req.body.drinkId, function(err, drink){
            if (!err) {
                res.status(200).send({status: "ok"})
                console.log("drink deleted!");
            }       
            else {
                res.status(200).send({status: "error"})
                console.log("err in delete drink: " + err);
            }
        })
    })
}