import { Module } from '@nestjs/common';
import { TalksAndQuestionsService } from './talks-and-questions.service';
import { TalksAndQuestionsController } from './talks-and-questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talks } from './entities/talks.entity';
import { UsersModule } from 'src/users/users.module';
import { Questions } from './entities/questions.entity';
import { User } from 'src/users/entity/user.entity';
import { Event } from './entities/event.entity';
import { Dni } from './entities/dni.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Questions, Talks, User, Event, Dni]),
    UsersModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '4h' },
    }),
  ],
  controllers: [TalksAndQuestionsController],
  providers: [TalksAndQuestionsService],
  exports: [TalksAndQuestionsService],
})
export class TalksAndQuestionsModule {}
