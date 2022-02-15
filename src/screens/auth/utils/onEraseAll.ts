export const onEraseAll = (
  setEmail: (arg: string) => void,
  setPassword: (arg: string) => void,
  setName: (arg: string) => void,
) => {
  setEmail('');
  setPassword('');
  setName('');
};
