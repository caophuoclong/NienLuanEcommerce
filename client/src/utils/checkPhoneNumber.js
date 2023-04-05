export default function checkPhoneNumber(phoneNumber) {
    // check vietnamese phone number
    const regex = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g;
    return regex.test(phoneNumber);
    
    
}