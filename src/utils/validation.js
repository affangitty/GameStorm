export const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  
  export const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  export const validateUsername = (username) => {
    return username.length >= 3;
  };
  
  export const validatePhoneNumber = (phone) => {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone);
  };
  
  export const validateCreditCard = (cardNumber) => {
    const re = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;
    return re.test(cardNumber);
  };