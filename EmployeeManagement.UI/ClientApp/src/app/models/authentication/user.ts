export class User {
  refreshToken: any;
  constructor(
    public userName?: string,
    public accessToken?: string,
    public role?: string

  ) { }
}
