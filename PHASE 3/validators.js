const { body } = require('express-validator');

const registerValidation = [
  // Name should not be empty
  body('fullname').not().isEmpty().withMessage("Full name is required."),

  body('nickname').not().isEmpty().withMessage("Nickname is required."),

  // Email should not be empty and must be a valid email
  body('emailAdd').not().isEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please provide a valid email."),

  body('phone').not().isEmpty().withMessage("Phone is required."),
  // Password needs to be min 6 chars
  body('pword').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),

  // Confirm Password needs to be min 6 chars AND must match the req.body.password field
  body('confirmPass').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long.")
    .custom((value, { req }) => {
      if (value !== req.body.pword) {
        throw new Error("Passwords must match.");
      }
      return true;
    })
];

const loginValidation = [
    // Email should not be empty and must be a valid email
    body('emailAdd').not().isEmpty().withMessage("Email is required.")
      .isEmail().withMessage("Please provide a valid email."),
    // Password should not be empty and needs to be min 6 chars
    body('pword').not().isEmpty().withMessage("Password is required.")
  ];

const updateUserValidation = [
    // Name should not be empty
    body('fullname').not().isEmpty().withMessage("Full name is required."),
  
    body('nickname').not().isEmpty().withMessage("Nickname is required."),
  
    // Email should not be empty and must be a valid email
    body('email').not().isEmpty().withMessage("Email is required.")
      .isEmail().withMessage("Please provide a valid email."),
  
    body('phone').not().isEmpty().withMessage("Phone is required."),
    // Password needs to be min 6 chars
    body('pass1').blacklist('*').isLength({ min: 6 }).withMessage("Invalid password."),
  
    // Confirm Password needs to be min 6 chars AND must match the req.body.password field
    body('pass2').blacklist('*').isLength({ min: 6 }).withMessage("Please type your current or new password to save your changes.")
      
      .custom((value, { req }) => {
        if (value !== req.body.pass1) {
          throw new Error("Passwords must match.");
        } 
        return true;
      })
  ];

module.exports = { registerValidation, loginValidation, updateUserValidation};