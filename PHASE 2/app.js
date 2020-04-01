require('./models/db');
const express = require('express');
const exphbs = require('express-handlebars');
const hbs = require('handlebars');
const bodyparser = require('body-parser');
const app = express();
const port = 3000;

const indexRouter = require("./routes/indexRoute");
const userRouter = require("./routes/userRoute");
// const customerRouter = require("./routes/customerRoute");
// const adminRouter = require("./routes/adminRoute");

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
            }
        }
}));

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

app.listen(port, () => {
    console.log('App listening at port ' + port);
});

app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/user', userRouter);
