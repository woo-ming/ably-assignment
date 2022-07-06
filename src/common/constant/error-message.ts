export class CellphoneVerificationExceptionMessage {
  static expired = '인증번호가 만료 되었어요';
  static invalid = '인증번호가 일치하지 않아요';
  static notFound = '요청을 찾을 수 없어요';
}

export class UnauthorizedExceptionMessage {
  static expired = '토큰이 만료 되었어요';
  static invalid = '토큰이 유효하지 않아요';
}
