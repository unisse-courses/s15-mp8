const mongoose = require('mongoose');

// const databaseURL = 'mongodb+srv://admin:123@cluster0-il1k9.mongodb.net/test?retryWrites=true&w=majority';
const databaseURL = 'mongodb+srv://admin:1234@cluster0-gncui.mongodb.net/test?retryWrites=true&w=majority';

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options, (err) => {
    if (!err) {
        console.log(`MongoDB connected`);
    }
    else {
        console.log(`error: ` + err);
    }
});

require('./user');
require('./order');
require('./drinkorder');
require('./drink');
require('./pricelist');
require('./cart');

module.exports = mongoose;