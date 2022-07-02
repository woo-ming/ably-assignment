export class UserDITokens {
  static readonly UserReader: unique symbol = Symbol('UserReader');
  static readonly UserStore: unique symbol = Symbol('UserStore');
  static readonly UserService: unique symbol = Symbol('UserService');
}
