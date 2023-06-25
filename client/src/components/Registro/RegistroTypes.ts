export interface IUserForm {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  verifyPassword: string;
}

export interface IUserFormError {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  verifyPassword: string;
}

export interface IUserFormState {
  [x: string]: string;
}
