import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
export class User {
  id: number;
  code: string;
  nickname: string;
  email: string;
  password: string;

  // 비즈니스 로직 메서드들
  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  changeNickname(newNickname: string): User {
    return new User({ ...this, nickname: newNickname });
  }

  // 도메인 규칙 검증
  static async create(partial: Partial<User>): Promise<User> {
    if (!partial.code || partial.code.trim().length === 0) {
      partial.code = uuidv4();
    }

    if (!partial.nickname || partial.nickname.trim().length === 0) {
      throw new Error('Nickname cannot be empty');
    }
    if (!partial.email || !partial.email.includes('@')) {
      throw new Error('Invalid email format');
    }
    if (!partial.password || partial.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const user = new User(partial);
    user.password = await bcrypt.hash(user.password, 10);
    return user;
  }

  setPassword(password: string): User {
    return new User({ ...this, password });
  }

  constructor(partial: Partial<User>) {
    return Object.assign(this, partial);
  }
}
