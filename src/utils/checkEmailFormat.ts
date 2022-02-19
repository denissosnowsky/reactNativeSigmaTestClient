export const checkEmailFormat = (text: string) => {
  const emailformat = /^\S+@\S+\.\S+$/;
  return text.match(emailformat);
};
