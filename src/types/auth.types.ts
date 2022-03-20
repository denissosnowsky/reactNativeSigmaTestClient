export type UserDAO = {
  name: string;
  email: string;
  id: string;
  photo: string;
  token: string;
  isActivated: boolean;
  activationLink: string;
};

export type UserDTO = {
  name: string;
  email: string;
  password: string;
  photo: string;
};
