import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
