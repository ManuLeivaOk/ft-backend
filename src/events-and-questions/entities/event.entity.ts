/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn,  } from 'typeorm';

@Entity()
export class Event {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  state: number;

}
