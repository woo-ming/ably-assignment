export class Regex {
  static readonly IsPhone = /^01([0|1|6|7|8|9])[0-9]{3,4}[0-9]{4}/;
  static readonly IsEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}/;
}
