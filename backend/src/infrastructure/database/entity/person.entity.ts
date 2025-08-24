import {
  CalendarType,
  Gender,
} from 'src/modules/horoscope/dto/horoscope.input';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'persons' })
export class PersonEntity extends CommonEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  birthYear: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  birthMonth: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  birthDay: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  gender: Gender;

  @Column({ type: 'varchar', length: 255, nullable: false })
  calandarType: CalendarType;

  @ManyToOne(() => UserEntity, (user) => user.persons, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
