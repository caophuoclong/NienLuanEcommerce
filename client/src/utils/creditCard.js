// check credit card number with length is 16 and start with 4 or 51 52 53 54 55
function checkCardNumber(creditCard) {
    const creditCardRegex = /^(5[1-5])[0-9]{14}$/;
    const checkVisa = /^(4)[0-9]{15}$/
    return creditCardRegex.test(creditCard) || checkVisa.test(creditCard);
}
// check cvv
function checkCvv(cvv) {
    const cvvRegex = /^[0-9]{3}$/;
    return cvvRegex.test(cvv);
}
// check expiration date
// format: mm/yy
// my exp data is {m: number, y: number}
function checkExpirationDate(exp){
    const checkMonth = /^([1-9]|1[0-2])$/
    const checkYear = /^\d{2}$/
    return checkMonth.test(exp.mm) && checkYear.test(exp.yy)
}
function detectCardType(cardNumber) {
  // Define regular expressions for each card type
  const visaPattern = /^4/;
  const mastercardPattern = /^5[1-5]/;
  const amexPattern = /^3[47]/;
  const discoverPattern = /^6(?:011|5[0-9]{2})/;
  const dinersClubPattern = /^3(?:0[0-5]|[68][0-9])[0-9]{4}$/;
  const jcbPattern = /^(?:2131|1800|35\d{3})\d{3}$/;

  // Test the card number against each regular expression
  if (visaPattern.test(cardNumber)) {
    return "Visa";
  } else if (mastercardPattern.test(cardNumber)) {
    return "Mastercard";
  } else if (amexPattern.test(cardNumber)) {
    return "American Express";
  } else if (discoverPattern.test(cardNumber)) {
    return "Discover";
  } else if (dinersClubPattern.test(cardNumber)) {
    return "Diners Club";
  } else if (jcbPattern.test(cardNumber)) {
    return "JCB";
  } else {
    return "Unknown";
  }
}
export {checkCardNumber, checkCvv, checkExpirationDate, detectCardType};
