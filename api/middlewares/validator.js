const { check } = require("express-validator");

exports.validate = method => {
  switch (method) {
    case "signup": {
      return [
        check("name", "Username required").isEmpty(),
        check("email", "Invalid email").isEmail(),
        check("pass", "Password required").isLength({ min: 5 }),
        check("cpass", "Confirm password required").isLength({ min: 5 }),
        check("agree", "Please accept our Terms & Conditions").isEmpty()
      ];
    }
    case "login": {
      return [
        check("email", "Invalid email").isEmail(),
        check("password", "Password is required")
          .not()
          .isEmpty()
      ];
    }
    default: {
      return [];
    }
  }
};
