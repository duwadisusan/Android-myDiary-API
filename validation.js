const validator = require("validator");

const registerInput = (data) => {
  //data is arguement!!
  let errors = {};
  if (data.email) {
    if (!validator.isLength(data.email.trim(), { min: 5, max: 30 })) {
      //trim() is used to remove white space from both ends and not from between two words. !!!!
      errors.email = "email must be in 5 to 30 chacraters.";
    }
  } else errors.email = "Email is required";

  if (data.password) {
    if (!validator.isLength(data.password.trim(), { min: 5, max: 30 }))
      errors.email = "Password must be in 5 to 30 chacraters.";
  } else errors.password = "Password is required";

  return {
    //undefined defined objece
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
module.exports = {
  registerInput,
};
