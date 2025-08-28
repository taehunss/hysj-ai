export class UserAuth {
  constructor(
    private _id: number,
    private _name: string,
    private _email?: string,
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }
}
