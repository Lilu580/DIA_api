export const validatePhone = (phoneNumber) => {
  if(phoneNumber.startsWith('+380') && phoneNumber.length === 13) {
    return true;
  }

  return false;
} 
