import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    createUserDto.group = randomNumber; // Se le asigna desde el comienzo el grupo, para que en la siguiente fase del evento ya quede
    return this.usersService.create(createUserDto);
  }
}
