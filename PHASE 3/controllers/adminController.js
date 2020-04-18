const DrinkModel = require('../models/drink')
const UserModel = require('../models/user')

exports.getHomepage = (req, res) => {
    UserModel.getUser({_id: req.session.user}, function(err, user) {
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

exports.logoutUser = (req, res) => {
    if (req.session) {
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
      });
    }
};