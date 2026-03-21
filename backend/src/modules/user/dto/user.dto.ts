export class CreateUserDTO {
  id: string;
  name!: string;
  email!: string;
  username!: string;
  password!: string;
}

export class UpdateUserDTO {
  id?: string;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
}

export class UserSearchParamsDTO {
  name?: string;
  email?: string;
  username?: string;
}
