/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { TalksAndQuestionsService } from './talks-and-questions.service';
import { Talks } from './entities/talks.entity';
import { CreateQuestionDto } from './dto/create-question-dto';
import { Questions } from './entities/questions.entity';
import { Event } from './entities/event.entity';
import { UpdateResult } from 'typeorm';
import { Dni } from './entities/dni.entity';

@Controller('talks-and-questions')
export class TalksAndQuestionsController {
  constructor(private readonly talksService: TalksAndQuestionsService) {}

  @Get()
  findAll(): Promise<Talks[]> {
    return this.talksService.findAll();
  }

  @Post()
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.talksService.createQuestion(
      createQuestionDto.question,
      createQuestionDto.userId,
      createQuestionDto.talkId,
    );
  }

  @Get('questionsByTalk/:talkId')
  findAllQuestionsByTalk(
    @Param('talkId') talkId: number,
  ): Promise<Questions[]> {
    return this.talksService.findAllQuestionsByTalk(talkId);
  }

  @Get('questionsByUser/:userId')
  findAllQuestionsByUser(
    @Param('userId') userId: number,
  ): Promise<Questions[]> {
    return this.talksService.findAllQuestionsByUser(userId);
  }

  @Get('eventState')
  getEventState(): Promise<Event | null> {
    return this.talksService.getEventState();
  }

  @Post('updateEventState')
  updateEventState(@Body() body: { newState: number }): Promise<UpdateResult> {
    return this.talksService.updateEventState(body.newState);
  }

  @Post('addDni')
  addDni(@Body() body: { dni: number }): Promise<Dni> {
    return this.talksService.addDni(body.dni);
  }

  @Get('groups')
  getGroups() {
    return this.talksService.getEvents();
  }
}
