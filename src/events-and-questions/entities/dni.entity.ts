/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn,  } from 'typeorm';

@Entity()
export class Dni {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dni: number;

}
