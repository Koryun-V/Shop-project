import _ from "lodash"
class Utils {

  static isValidatePassword = (password, confirmPassword) => {
    const errors = {};

    if (!password.trim()) {
      errors.password = 'Password should not be empty';
    }

    if (!/^(?=.*\d).{8,}$/.test(password)) {
      errors.password = 'Your password must be at least 8 characters long.';
    }

    if (password !== confirmPassword) {
      errors.password = 'Passwords do not match.';
    }

    return errors;
  };


  static deleteEmptyKeys = (object) => {
    const obj = _.cloneDeep(object);

    for (const propName in obj) {
      if ((typeof obj[propName] !== "boolean" && typeof obj[propName] !== "number")
        && (typeof obj[propName] === "object" ? _.isEmpty(obj[propName]) : !obj[propName].trim())) {
        delete obj[propName];
      }
    }
    return obj
  };
}
export default Utils


