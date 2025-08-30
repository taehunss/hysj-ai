export class UserAuth {
  code: string;
  name: string;
  email: string;

  constructor(partial: Partial<UserAuth>) {
    Object.assign(this, partial);
  }
}
