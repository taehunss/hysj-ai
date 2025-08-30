export class AccessTokenPayload {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly email: string,
  ) {}
}
