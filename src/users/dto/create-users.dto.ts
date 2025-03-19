import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @IsString()
  school: string;

  @IsString()
  instagram: string;

  @IsDateString()
  birthday: string;
}
