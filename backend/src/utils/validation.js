const validator = require("validator");
const validateSignUpData = (req) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
      throw new Error("First name and last name are required");
    }

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid email");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Password is weak");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { validateSignUpData };
