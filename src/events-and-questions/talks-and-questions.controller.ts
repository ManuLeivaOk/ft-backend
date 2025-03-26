/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { TalksAndQuestionsService } from './talks-and-questions.service';
import { Talks } from './entities/talks.entity';
import { CreateQuestionDto } from './dto/create-question-dto';
import { Questions } from './entities/questions.entity';
import { Event } from './entities/event.entity';
import { UpdateResult } from 'typeorm';

@Controller('talks-and-questions')
export class TalksAndQuestionsController {
  constructor(private readonly talksService: TalksAndQuestionsService) {}

  @Get()
  findAll(): Promise<Talks[]> {
    console.log('manu putooo');
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

  @Get('eventState')
  getEventState(): Promise<Event[]> {
    return this.talksService.getEventState();
  }

  @Post('updateEventState')
  updateEventState(@Body() body: { newState: number }): Promise<UpdateResult> {
    return this.talksService.updateEventState(body.newState);
  }
}
