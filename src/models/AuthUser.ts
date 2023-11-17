export class AuthUser {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  public get token() {
    return this._token;
  }

  public isValidToken(): boolean {
    // Validation to ensure we have a valid expiration date and it is not past the current date
    return (
      !!this._tokenExpirationDate && new Date() <= this._tokenExpirationDate
    );
  }
}
