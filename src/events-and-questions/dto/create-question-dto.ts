/* eslint-disable prettier/prettier */
import { IsString, IsInt } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  question: string;

  @IsInt()
  userId: number;

  @IsInt()
  talkId: number;
}
