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
      if (value !== req.body.password) {
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

module.exports = { registerValidation, loginValidation};