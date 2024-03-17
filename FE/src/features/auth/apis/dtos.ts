export class TokenDto {
  public readonly accessToken: string;
  public readonly accessExpiredTime: number;
  constructor(data: { accessToken: string; accessExpiredTime: number }) {
    this.accessToken = data?.accessToken;
    this.accessExpiredTime = data?.accessExpiredTime;
  }
}
