import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TalksAndQuestionsModule } from './events-and-questions/talks-and-questions.module';
import { DatabaseSeederService } from './seeder/database-seeder';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', 'database.sqlite'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    TalksAndQuestionsModule,
    UsersModule,
    AuthModule,
  ],
  providers: [DatabaseSeederService],
})
export class AppModule {}
