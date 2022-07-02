export class RegisterUserCommand {
  name: string;
  phone: string;
  email: string;
  nickname: string;
  password: string;
}

export class ModifyUserCommand {
  id: string;
  nickname?: string;
}

export class ModifyUserPasswordCommand {
  id: string;
  password: string;
}
