import _ from "lodash"

class Utils {
  static isValidatePassword = ({ password, confirmPassword }) => {
    const errors = {};

    const passwordRegex = /^(?=.*\d)(?=.*[A-Za-z]).{8,}$/;

    const trimmedPassword = password.trim();

    if (!trimmedPassword) {
      errors.password = 'Password should not be empty';
    }else if (!passwordRegex.test(trimmedPassword)){
      errors.password = 'Password must be at least 8 characters long and contain at least one number.';
    }else if (trimmedPassword !== confirmPassword.trim()) {
      errors.password = 'Passwords do not match.';
    }

    return errors;
  };


  static isValidateProfileData = ({ firstName, lastName, address }) => {
    const nameValidation = /^[a-zA-Z\s-]{3,20}$/;
    const errorText = 'Use only Latin letters, minimum 3 characters, no spaces, symbols, or numbers.';
    const errors = {};

    const validateName = (name, field) => {
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');

      if (!name || !name.trim()) {
        errors[field] = `${fieldName} should not be empty`;
      } else if (!nameValidation.test(name)) {
        errors[field] = errorText;
      }
    };

    validateName(firstName, 'firstName');
    validateName(lastName, 'lastName');
    validateName(address, 'address');

    return errors;
  };

}

export default Utils



