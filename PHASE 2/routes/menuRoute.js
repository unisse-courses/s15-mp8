const router = require('express').Router();

const menuController = require('../controllers/menuController');

router.get('/espresso', menuController.getEspressoDrinks);

// app.get('/order-espresso', (req, res) => {
//     res.render('menu',  { 
//         title: 'Espresso - Order Menu', 
//         layout: 'menu-layout',
//         isAdmin: false,
//         loggedIn: true,
//         loc: 'Order',
//         category: 'Espresso',
//         drink:[ 
//             {
//                 drinkName: "Caffe Latte",
//                 drinkPic: "/images/drinks/espresso/caffelattereal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "Caffe Mocha",
//                 drinkPic: "/images/drinks/espresso/caffemochareal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "Cappuccino",
//                 drinkPic: "/images/drinks/espresso/cappuccinoreal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "Caramel Macchiato",
//                 drinkPic: "/images/drinks/espresso/caramelmacchiatoREAL.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "White Chocolate",
//                 drinkPic: "/images/drinks/espresso/WHITECHOCOMOCHAREAL.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             }
//         ] });
// });

// app.get('/order-chocolate', (req, res) => {
//     res.render('menu',  { 
//         title: 'Chocolate - Order Menu', 
//         layout: 'menu-layout',
//         isAdmin: false,
//         loggedIn: true,
//         loc: 'Order',
//         category: 'Chocolate',
//         drink:[ 
//             {
//                 drinkName: "Signature Hot Chocolate",
//                 drinkPic: "/images/drinks/chocolate/signaturehotchocreal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "White Hot Chocolate",
//                 drinkPic: "/images/drinks/chocolate/whitehotchocoreal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             }
//         ]
//         });
// });

// app.get('/order-frappuccino', (req, res) => {
//     res.render('menu',  { 
//         title: 'Frappuccino - Order Menu', 
//         layout: 'menu-layout',
//         isAdmin: false,
//         loggedIn: true,
//         loc: 'Order',
//         category: 'Frappuccino',
//         drink:[ 
//             {
//                 drinkName: "Coffee Jelly Frappuccino",
//                 drinkPic: "/images/drinks/frappucino/coffeejellyreal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "Dark Caramel Coffee Frappuccino",
//                 drinkPic: "/images/drinks/frappucino/darkcaramelcoffeefrapreal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "Dark Mocha Frappuccino",
//                 drinkPic: "/images/drinks/frappucino/darkmochafrapreal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "Starberries and Cream Frappuccino",
//                 drinkPic: "/images/drinks/frappucino/strawberries&creamreal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "Mocha Frappuccino",
//                 drinkPic: "/images/drinks/frappucino/triplemochafrapreal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             }
//         ] });
// });

// app.get('/order-coffee-craft', (req, res) => {
//     res.render('menu',  { 
//         title: 'Coffee Craft - Order Menu', 
//         layout: 'menu-layout',
//         isAdmin: false,
//         loggedIn: true,
//         loc: 'Order',
//         category: 'Coffee Craft',
//         drink:[ 
//             {
//                 drinkName: "Brewed Coffee",
//                 drinkPic: "/images/drinks/coffee craft/brewedcoffeereal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "Cold Brew",
//                 drinkPic: "/images/drinks/coffee craft/coldbrewreal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "Cold Foam Iced Espresso",
//                 drinkPic: "/images/drinks/coffee craft/coldfoamicedespressoreal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "Vanilla Sweet Cream Cold Brew",
//                 drinkPic: "/images/drinks/coffee craft/vanillasweetcreamcoldbrewreal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             }
//          ] });
// });

// app.get('/order-teavana-teas', (req, res) => {
//     res.render('menu',  { 
//         title: 'Teavana Teas - Order Menu', 
//         layout: 'menu-layout',
//         isAdmin: false,
//         loggedIn: true,
//         loc: 'Order',
//         category: 'Teavana Teas',
//         drink:[ 
//             {
//                 drinkName: "Chai Tea Latte",
//                 drinkPic: "/images/drinks/Teavana Teas/chaitealattereal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "Green Tea Latte",
//                 drinkPic: "/images/drinks/Teavana Teas/greentealattereal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "Iced Shaken Black Tea",
//                 drinkPic: "/images/drinks/Teavana Teas/icedshakenblackteareal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "Iced Shaken Hibiscus with Pomegranate Pearl",
//                 drinkPic: "/images/drinks/Teavana Teas/icedshakenhibiscuswithpomegranatereal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             },
//             {
//                 drinkName: "Matcha Espresso Fusion",
//                 drinkPic: "/images/drinks/Teavana Teas/matchaespressofusionreal.png",
//                 tallPrice: 175,
//                 grandePrice: 185,
//                 ventiPrice: 195
//             }
//         ] });
// });

module.exports = router;