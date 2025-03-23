import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @Min(0)
  @Max(120)
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  school: string;

  @IsString()
  @IsNotEmpty()
  instagram: string;

  @IsDateString()
  @IsNotEmpty()
  birthday: string;

  @IsString()
  @IsNotEmpty()
  documentNumber;

  group: number;
}
