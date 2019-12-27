export const validatePassword = (input: string): boolean => {
  const patt = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  return !!input.match(patt);
};
