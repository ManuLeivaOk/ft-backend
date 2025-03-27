/* eslint-disable prettier/prettier */
import { User } from 'src/users/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Talks } from './talks.entity';

@Entity()
export class Questions {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @ManyToOne(() => User, (user) => user.questions, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Talks, (talks) => talks.questions, { onDelete: 'CASCADE' })
  talk: Talks;
}
