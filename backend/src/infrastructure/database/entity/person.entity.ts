import { Person } from 'src/modules/person/domain/person';
import { CalendarType, Gender } from 'src/modules/person/dto/person.dto';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'persons' })
export class PersonEntity extends CommonEntity implements Person {
  @Column({ type: 'varchar', nullable: false })
  calendarType: CalendarType;

  @Column({ type: 'boolean', nullable: false })
  isUnknownBirthTime: boolean;

  @Column({ type: 'varchar', length: 255, nullable: false })
  code: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  birthYear: number;

  @Column({ type: 'int', nullable: false })
  birthMonth: number;

  @Column({ type: 'int', nullable: false })
  birthDay: number;

  @Column({ type: 'int', nullable: true })
  birthHour: number;

  @Column({ type: 'int', nullable: true })
  birthMinute: number;

  @Column({ type: 'varchar', nullable: false })
  gender: Gender;

  @ManyToOne(() => UserEntity, (user) => user.persons, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
