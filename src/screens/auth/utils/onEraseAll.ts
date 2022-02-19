export const onEraseAll = (
  setEmail: (arg: string) => void,
  setPassword: (arg: string) => void,
  setName: (arg: string) => void,
  setConfirmPassword: (arg: string) => void,
) => {
  setEmail('');
  setPassword('');
  setName('');
  setConfirmPassword('');
};
