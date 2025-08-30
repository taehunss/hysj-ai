import * as bcrypt from 'bcrypt';

export class User {
  constructor(
    public readonly id: number,
    public readonly nickname: string,
    public readonly email: string,
    private readonly password: string,
  ) {}

  // 비즈니스 로직 메서드들
  validatePassword(password: string): boolean {
    return bcrypt.compare(password, this.password);
  }

  changeNickname(newNickname: string): User {
    return new User(this.id, newNickname, this.email, this.password);
  }

  // 도메인 규칙 검증
  static create(nickname: string, email: string, password: string): User {
    if (!nickname || nickname.trim().length === 0) {
      throw new Error('Nickname cannot be empty');
    }
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email format');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    return new User(
      0, // 실제로는 Repository에서 생성
      nickname,
      email,
      password,
    );
  }
}
