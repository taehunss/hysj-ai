export class AccessTokenPayload {
  constructor(
    public readonly sub: number,
    public readonly name: string,
    public readonly email: string,
  ) {}
}
