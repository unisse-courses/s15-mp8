const router = require('express').Router();
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

const menuController = require('../controllers/menuController');

router.get('/order/:category', menuController.getDrinksForOrder);
router.get('/update/:category', menuController.getDrinksForUpdate);

router.post('/addDrink', upload.single('drinkPic'), menuController.addDrink);
router.post('/updateDrink', upload.single('updateDrinkPic'), menuController.updateDrink);

module.exports = router;