const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

app.set('view engine', 'hbs');

app.engine('hbs', exphbs({
    extname: 'hbs',
    helpers :
        {
            if_equal : function(a, b, opts) {
                if (a == b) {
                    return opts.fn(this)
                } else {
                    return opts.inverse(this)
                }
            }
        }
}));

app.listen(port, () => {
    console.log('App listening at port ' + port);
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('homepage',  { 
        title: 'Home - Starbucks Assist', 
        layout: 'home', 
        loggedIn: false,
        css: ['header-footer.css', 'content-home.css'] });
});

app.get('/register', (req, res) => {
    res.render('register',  { 
        title: 'Register - Starbucks Assist', 
        layout: 'home', 
        isRegister: true,
        css: ['header-footer.css', 'content-register.css'] });
});

//MERGE NATIN NEXT TIME
app.get('/home-customer', (req, res) => {
    res.render('homepage',  {
        title: 'Home - Starbucks Assist', 
        layout: 'home', 
        loc: 'Home',
        loggedIn: true,
        css: ['header-footer.css', 'content-home.css'],
        isAdmin: false });
});

app.get('/home-admin', (req, res) => {
    res.render('homepage',  {
        title: 'Home - Starbucks Assist', 
        layout: 'home',
        loc: 'Home',
        loggedIn: true,
        css: ['header-footer.css', 'content-home.css'],
        isAdmin: true});
});


//CUSTOMER VIEW
app.get('/cart-customer', (req, res) => {
    res.render('cart-customer',  {
        title: 'My Cart - Starbucks Assist', 
        layout: 'home', 
        loc: 'View Cart',
        isAdmin: false,
        loggedIn: true,
        css: ['header-footer.css', 'content-cart.css'] });
});

app.get('/order-status-customer', (req, res) => {
    res.render('order-status-customer',  {
        title: 'Order Status - Starbucks Assist', 
        layout: 'home', 
        loc: 'Order Status',
        isAdmin: false,
        loggedIn: true,
        css: ['header-footer.css', 'content-status.css'] });
});

app.get('/my-favorites', (req, res) => {
    res.render('my-favorites',  {
        title: 'My Favorites - Starbucks Assist', 
        layout: 'home', 
        isAdmin: false,
        loggedIn: true,
        css: ['header-footer.css', 'content-my-favorites.css'] });
});

app.get('/transaction-history', (req, res) => {
    res.render('transaction-history',  {
        title: 'Transaction History - Starbucks Assist', 
        layout: 'home', 
        isAdmin: false,
        loggedIn: true,
        css: ['header-footer.css', 'transaction-history.css'] });
});

app.get('/acc-settings', (req, res) => {
    res.render('acc-settings',  {
        title: 'Account Settings - Starbucks Assist', 
        layout: 'home', 
        isAdmin: false,
        loggedIn: true,
        css: ['header-footer.css', 'acct_settings.css'] });
});

//ORDERS (MERGE SOON)
app.get('/order-espresso', (req, res) => {
    res.render('menu',  { 
        title: 'Espresso - Order Menu', 
        layout: 'menu-layout',
        isAdmin: false,
        loggedIn: true,
        loc: 'Order',
        category: 'Espresso',
        drink:[ 
            {
                drinkName: "Caffe Latte",
                drinkPic: "../images/drinks/espresso/caffelattereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Caffe Latte",
                drinkPic: "../images/drinks/espresso/caffelattereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Caffe Latte",
                drinkPic: "../images/drinks/espresso/caffelattereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Caffe Latte",
                drinkPic: "../images/drinks/espresso/caffelattereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Caffe Latte",
                drinkPic: "../images/drinks/espresso/caffelattereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Caffe Latte",
                drinkPic: "../images/drinks/espresso/caffelattereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Caffe Latte",
                drinkPic: "../images/drinks/espresso/caffelattereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Caffe Mocha",
                drinkPic: "../images/drinks/espresso/caffemochareal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Cappuccino",
                drinkPic: "../images/drinks/espresso/cappuccinoreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Caramel Macchiato",
                drinkPic: "../images/drinks/espresso/caramelmacchiatoREAL.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "White Chocolate",
                drinkPic: "../images/drinks/espresso/WHITECHOCOMOCHAREAL.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            }
        ] });
});

app.get('/order-chocolate', (req, res) => {
    res.render('menu',  { 
        title: 'Chocolate - Order Menu', 
        layout: 'menu-layout',
        isAdmin: false,
        loggedIn: true,
        loc: 'Order',
        category: 'Chocolate',
        drink:[ 
            {
                drinkName: "Signature Hot Chocolate",
                drinkPic: "../images/drinks/chocolate/signaturehotchocreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "White Hot Chocolate",
                drinkPic: "../images/drinks/chocolate/whitehotchocoreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            }
        ]
        });
});

app.get('/order-frappuccino', (req, res) => {
    res.render('menu',  { 
        title: 'Frappuccino - Order Menu', 
        layout: 'menu-layout',
        isAdmin: false,
        loggedIn: true,
        loc: 'Order',
        category: 'Frappuccino',
        drink:[ 
            {
                drinkName: "Coffee Jelly Frappuccino",
                drinkPic: "../images/drinks/frappucino/coffeejellyreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Dark Caramel Coffee Frappuccino",
                drinkPic: "../images/drinks/frappucino/darkcaramelcoffeefrapreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Dark Mocha Frappuccino",
                drinkPic: "../images/drinks/frappucino/darkmochafrapreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Starberries and Cream Frappuccino",
                drinkPic: "../images/drinks/frappucino/strawberries&creamreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Mocha Frappuccino",
                drinkPic: "../images/drinks/frappucino/triplemochafrapreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            }
        ] });
});

app.get('/order-coffee-craft', (req, res) => {
    res.render('menu',  { 
        title: 'Coffee Craft - Order Menu', 
        layout: 'menu-layout',
        isAdmin: false,
        loggedIn: true,
        loc: 'Order',
        category: 'Coffee Craft',
        drink:[ 
            {
                drinkName: "Brewed Coffee",
                drinkPic: "../images/drinks/coffee craft/brewedcoffeereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Cold Brew",
                drinkPic: "../images/drinks/coffee craft/coldbrewreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Cold Foam Iced Espresso",
                drinkPic: "../images/drinks/coffee craft/coldfoamicedespressoreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Vanilla Sweet Cream Cold Brew",
                drinkPic: "../images/drinks/coffee craft/vanillasweetcreamcoldbrewreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            }
         ] });
});

app.get('/order-teavana-teas', (req, res) => {
    res.render('menu',  { 
        title: 'Teavana Teas - Order Menu', 
        layout: 'menu-layout',
        isAdmin: false,
        loggedIn: true,
        loc: 'Order',
        category: 'Teavana Teas',
        drink:[ 
            {
                drinkName: "Chai Tea Latte",
                drinkPic: "../images/drinks/Teavana Teas/chaitealattereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Green Tea Latte",
                drinkPic: "../images/drinks/Teavana Teas/greentealattereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Iced Shaken Black Tea",
                drinkPic: "../images/drinks/Teavana Teas/icedshakenblackteareal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Iced Shaken Hibiscus with Pomegranate Pearl",
                drinkPic: "../images/drinks/Teavana Teas/icedshakenhibiscuswithpomegranatereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Matcha Espresso Fusion",
                drinkPic: "../images/drinks/Teavana Teas/matchaespressofusionreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            }
        ] });
});


//ADMIN
//ORDER STATUS
app.get('/orders-pending', (req, res) => {
    res.render('order-status-admin',  { 
        title: 'Pending - Update Orders', 
        loc: 'Update Orders',
        isAdmin: true,
        loggedIn: true,
        layout: 'update-status',
        orders: [
        {
            customerNickname: "Ainsley",
            orderNum: '000001',
            numOfOrders: '2',
            buttonLbl: 'Receive'
        },
        {
            customerNickname: "Ainsley",
            orderNum: '000001',
            numOfOrders: '2',
            buttonLbl: 'Receive'
        },
        {
            customerNickname: "Ainsley",
            orderNum: '000001',
            numOfOrders: '2',
            buttonLbl: 'Receive'
        }]
    });
});

app.get('/orders-preparing', (req, res) => {
    res.render('order-status-admin',  { 
        title: 'Preparing - Update Orders', 
        loc: 'Update Orders',
        isAdmin: true,
        loggedIn: true,
        layout: 'update-status',
        orders: [
            {
                customerNickname: "Ainsley",
                orderNum: '000001',
                numOfOrders: '2',
                buttonLbl: 'Serve'
            },
            {
                customerNickname: "Ainsley",
                orderNum: '000001',
                numOfOrders: '2',
                buttonLbl: 'Serve'
            },
            {
                customerNickname: "Ainsley",
                orderNum: '000001',
                numOfOrders: '2',
                buttonLbl: 'Serve'
            }],
            
    });
});

app.get('/orders-received', (req, res) => {
    res.render('order-status-admin',  { 
        title: 'Received - Update Orders', 
        loc: 'Update Orders',
        isAdmin: true,
        loggedIn: true,
        layout: 'update-status',
        orders: [
            {
                customerNickname: "Ainsley",
                orderNum: '000001',
                numOfOrders: '2',
                buttonLbl: 'Prepare'
            },
            {
                customerNickname: "Ainsley",
                orderNum: '000001',
                numOfOrders: '2',
                buttonLbl: 'Prepare'
            },
            {
                customerNickname: "Ainsley",
                orderNum: '000001',
                numOfOrders: '2',
                buttonLbl: 'Prepare'
            },
        ]           
    });
});

//MENU (MERGE SOON)
app.get('/update-espresso', (req, res) => {
    res.render('menu',  { 
        title: 'Espresso - Update Menu', 
        layout: 'menu-layout',
        loc: 'Update Menu',
        isAdmin: true,
        loggedIn: true,
        category: 'Espresso',
        drink:[ 
            {
                drinkName: "Caffe Latte",
                drinkPic: "../images/drinks/espresso/caffelattereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Caffe Mocha",
                drinkPic: "../images/drinks/espresso/caffemochareal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Cappuccino",
                drinkPic: "../images/drinks/espresso/cappuccinoreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Caramel Macchiato",
                drinkPic: "../images/drinks/espresso/caramelmacchiatoREAL.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "White Chocolate",
                drinkPic: "../images/drinks/espresso/WHITECHOCOMOCHAREAL.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            }
        ] });
});

app.get('/update-chocolate', (req, res) => {
    res.render('menu',  { 
        title: 'Chocolate - Update Menu', 
        layout: 'menu-layout',
        loc: 'Update Menu',
        isAdmin: true,
        loggedIn: true,
        category: 'Chocolate',
        drink:[ 
            {
                drinkName: "Signature Hot Chocolate",
                drinkPic: "../images/drinks/chocolate/signaturehotchocreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "White Hot Chocolate",
                drinkPic: "../images/drinks/chocolate/whitehotchocoreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            }
        ] });
});

app.get('/update-frappuccino', (req, res) => {
    res.render('menu',  { 
        title: 'Frappuccino - Update Menu', 
        layout: 'menu-layout',
        loc: 'Update Menu',
        isAdmin: true,
        loggedIn: true,
        category: 'Frappuccino',
        drink:[ 
            {
                drinkName: "Coffee Jelly Frappuccino",
                drinkPic: "../images/drinks/frappucino/coffeejellyreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Dark Caramel Coffee Frappuccino",
                drinkPic: "../images/drinks/frappucino/darkcaramelcoffeefrapreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Dark Mocha Frappuccino",
                drinkPic: "../images/drinks/frappucino/darkmochafrapreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Starberries and Cream Frappuccino",
                drinkPic: "../images/drinks/frappucino/strawberries&creamreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Mocha Frappuccino",
                drinkPic: "../images/drinks/frappucino/triplemochafrapreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            }
        ] });
});

app.get('/update-coffee-craft', (req, res) => {
    res.render('menu',  { 
        title: 'Coffee Craft - Update Menu', 
        layout: 'menu-layout',
        loc: 'Update Menu',
        isAdmin: true,
        loggedIn: true,
        category: 'Coffee Craft',
        drink:[ 
            {
                drinkName: "Brewed Coffee",
                drinkPic: "../images/drinks/coffee craft/brewedcoffeereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Cold Brew",
                drinkPic: "../images/drinks/coffee craft/coldbrewreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Cold Foam Iced Espresso",
                drinkPic: "../images/drinks/coffee craft/coldfoamicedespressoreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Vanilla Sweet Cream Cold Brew",
                drinkPic: "../images/drinks/coffee craft/vanillasweetcreamcoldbrewreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            }
         ] });
});

app.get('/update-teavana-teas', (req, res) => {
    res.render('menu',  { 
        title: 'Teavana Teas - Update Menu', 
        layout: 'menu-layout',
        loc: 'Update Menu',
        isAdmin: true,
        loggedIn: true,
        category: 'Teavana Teas',
        drink:[ 
            {
                drinkName: "Chai Tea Latte",
                drinkPic: "../images/drinks/Teavana Teas/chaitealattereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Green Tea Latte",
                drinkPic: "../images/drinks/Teavana Teas/greentealattereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Iced Shaken Black Tea",
                drinkPic: "../images/drinks/Teavana Teas/icedshakenblackteareal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Iced Shaken Hibiscus with Pomegranate Pearl",
                drinkPic: "../images/drinks/Teavana Teas/icedshakenhibiscuswithpomegranatereal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            },
            {
                drinkName: "Matcha Espresso Fusion",
                drinkPic: "../images/drinks/Teavana Teas/matchaespressofusionreal.png",
                tallPrice: 175,
                grandePrice: 185,
                ventiPrice: 195
            }
        ] });
});


//FORMS
// app.post('/register', urlencodedParser, function(req, res) {
//     console.log("here");
//     console.log(req.body);
//     res.render('home-customer', {data: req.body});
// });
