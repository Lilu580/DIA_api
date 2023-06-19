export const validateEmail = (email) => {
  if(email.includes('@')) {
    return true;
  }

  return false;
}
