class Validation {

    /**
     * @description checks if an email synstax is right or wrong
     * @param {String} email
     * @returns {Boolean} Boolean
     */
     static isEmailValid(email) {
         const emailRegex = /^([a-z_.!@#$%^&*0-9]{3,25})@([a-z]{3,20})\.([a-z]){2,7}(\.[a-z]{2,5})?$/i;
         return emailRegex.test(email);
     }

     /**
      * @description checks if a password syntax is right
      * @param {String} password to be tested
      * @returns {Boolean} returns true or false
      */
     static isPasswordValid(password){
         const passwordRegex = /^(?=.*[0-9])([a-zA-Z0-9!@#$.%^&*~`?><,.';"|}{}+-=)()|]{8,20})$/;
         return passwordRegex.test(password)
     }

    /**
     * @description checks if a name syntax is right
     * @param {String} name to be tested
     * @return {Boolean} returns true or false
     */
    static isNameValid(name) {
        const nameRegex = /^([a-zA-Z]){3,20}$/;
        return nameRegex.test(name);
    }

    /**
     * @description checks if a name syntax is right
     * @param {String} name to be tested
     * @return {Boolean} returns true or false
     */
    static isPhoneValid(name) {
        const phoneRegex = /^\d{12}$/;
        return phoneRegex.test(name);
    }

    static isIdValid(name) {
        const idRegex = /^\d{8}$/;
        return idRegex.test(name)
    }


}

export default Validation;