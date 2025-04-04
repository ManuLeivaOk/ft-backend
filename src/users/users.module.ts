import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './entity/user.entity';
import { Dni } from 'src/events-and-questions/entities/dni.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Dni]),
    JwtModule.register({
      secret: 'miSecretoSuperSecreto',
      signOptions: { expiresIn: '4h' },
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
