import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
