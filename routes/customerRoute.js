const router = require('express').Router();

//for checking of users only; not important
const mongoose = require('mongoose');

const customerController = require('../controllers/customerController');

const menuRouter = require("./menuRoute");

const { isPrivate } = require('../middlewares/checkAuth');
const { updateUserValidation } = require('../validators.js');

const multer = require('multer');

//for uploading files with multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/uploads');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.get('/home', isPrivate, customerController.getHomepage);

router.get('/cart', isPrivate, customerController.getCart);

router.post('/addToCart', customerController.addToCart);
router.post('/updateQuant', customerController.updateQuant);
router.post('/updateRequest', customerController.updateRequest);
router.post('/deleteDrink', customerController.deleteDrink);
router.post('/checkout', customerController.checkout);


router.get('/account-settings', isPrivate, customerController.getUserDetails);
router.post('/updateUser', upload.single('displayPhoto'), updateUserValidation, customerController.updateUser);

router.get('/order-status', isPrivate, customerController.getOrderStatus);

router.get('/favorites', isPrivate, customerController.getFavorites);
router.post('/addToFavorites', customerController.addToFavorites);
router.post('/deleteFavorite', customerController.deleteFavorite);

router.get('/transaction-history', isPrivate, customerController.getTransactionHistory);

router.get('/logout', isPrivate, customerController.logoutUser)

router.use('/menu', menuRouter);

module.exports = router;