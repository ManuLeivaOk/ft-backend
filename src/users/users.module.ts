import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  // Importa TypeOrmModule
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Registra la entidad User
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
