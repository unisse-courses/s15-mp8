const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:123@cluster0-il1k9.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology: true}, (err) => {
    if (!err) {
        console.log(`MongoDB connected`);
    }
    else {
        console.log(`error: ` + err);
    }
});

require('./user');
require('./favorite');
require('./order');
require('./drinkorder');
require('./drink');
require('./pricelist');
require('./cart');