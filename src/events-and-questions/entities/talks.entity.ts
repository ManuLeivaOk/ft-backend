import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Questions } from './questions.entity';

@Entity()
export class Talks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  speakerDNI: string;

  @OneToMany(() => Questions, (question) => question.talk)
  questions: Questions[];
}
