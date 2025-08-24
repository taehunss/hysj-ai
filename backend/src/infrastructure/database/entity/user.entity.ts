import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { PersonEntity } from './person.entity';

@Entity({ name: 'users' })
export class UserEntity extends CommonEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  nickname: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @OneToMany(() => PersonEntity, (person) => person.user, {
    cascade: true,
  })
  persons: PersonEntity[];
}
