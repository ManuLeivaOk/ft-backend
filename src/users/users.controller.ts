import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { Public } from '../decorators/public.decorator';
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get('changeFirstState/:code/:documentNumber')
  async changeFirstState(
    @Param('code') code: string,
    @Param('documentNumber') documentNumber: string,
  ) {
    return await this.usersService.changeFirstState(code, documentNumber);
  }

  @Get('selectGroup/:documentNumber/:idGroup')
  async selectGroup(
    @Param('documentNumber') documentNumber: string,
    @Param('idGroup') idGroup: string,
  ) {
    return await this.usersService.selectGroup(documentNumber, idGroup);
  }

  @Get('updateSession')
  async updateSession(@Param('documentNumber') documentNumber: string) {
    return await this.usersService.updateSession(documentNumber);
  }
}
