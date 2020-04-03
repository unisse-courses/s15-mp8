const DrinkModel = require('../models/drink')
const UserModel = require('../models/user')

exports.getHomepage = (req, res) => {
    UserModel.getUser({fullname: "Admin"}, function(user) {
        DrinkModel.getNewlyAdded(function(drinks) {
            res.render('homepage',  {
                title: 'Home - Starbucks Assist', 
                layout: 'home',
                loc: 'Home',
                loggedIn: true,
                css: ['header-footer.css', 'content-home.css'],
                isAdmin: true,
                drinks: drinks,
                user: user
            });
        })
    });
}