const express = require('express');
const exphbs = require('express-handlebars');
const hbs = require('handlebars');
const bodyparser = require('body-parser');
const mongoose = require('./models/db');

const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

const app = express();
const port = 3000;

const indexRouter = require("./routes/indexRoute");

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
            },

            if_less : function(a, b, opts) {
                if (a < b) {
                    return opts.fn(this)
                } else {
                    return opts.inverse(this)
                }
            },

            counter : function (index) {
                return index + 1;
            },

            if_equal_index : function (index, length, opts) {
                if (index == length) {
                    return opts.fn(this)
                } else {
                    return opts.inverse(this)
                }
            },

            date_format: function (date) {
                var words = (date.toString()).split(" ");
                // words 

                return `${words[1]} ${words[2]} ${words[3]}`
            },

            ordernum_format : function (ordernum) {
               ordernum = ordernum.toString()
                while (ordernum.length < 5) {
                    ordernum = '0' + ordernum;
                }
                return ordernum;
            },

            getPreviousCategory : function (array, index) {
                return array[index-1].category;
            }
        }
}));

app.set('view engine', 'hbs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.use(session({
    secret: 'somegibberishsecret',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
  }));
  
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use('/', indexRouter);

app.listen(port, () => {
    console.log('App listening at port ' + port);
});
