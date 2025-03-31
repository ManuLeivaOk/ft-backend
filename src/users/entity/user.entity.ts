import { Questions } from 'src/events-and-questions/entities/questions.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  documentNumber: string;

  @Column()
  age: number;

  @Column()
  school: string;

  @Column()
  instagram: string;

  @Column()
  birthday: string;

  @Column()
  colour: string;

  @Column()
  state: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  type: number;

  @Column({ nullable: true })
  group: number;

  @Column({ nullable: true })
  eventId: number;

  @OneToMany(() => Questions, (question) => question.user)
  questions: Questions[];
}
