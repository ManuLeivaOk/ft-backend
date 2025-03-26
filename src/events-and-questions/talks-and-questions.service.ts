/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Talks } from './entities/talks.entity';
import { Questions } from './entities/questions.entity';
import { User } from 'src/users/user.entity';
import { Event } from './entities/event.entity';

@Injectable()
export class TalksAndQuestionsService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Questions) private questionsRepository: Repository<Questions>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Talks)
    private readonly talkRepository: Repository<Talks>,
  ) {}

  findAll(): Promise<Talks[]> {
    return this.talkRepository.find();
  }

  async createQuestion(questionText: string, userId: number, talkId: number): Promise<Questions> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const talk = await this.talkRepository.findOne({ where: { id: talkId } });

    if (!user || !talk) {
      throw new Error('User or Talk not found');
    }

    const question = this.questionsRepository.create({
      question: questionText,
      user: user,  
      talk: talk,
    });

    return await this.questionsRepository.save(question);
  }

  findAllQuestionsByTalk(talkId: number): Promise<Questions[]> {
    return this.questionsRepository.find({
        where: { talk: { id: talkId } },
        relations: ['talk'],
    });
  }

  getEventState(): Promise<Event[]> {
    return this.eventRepository.find();
  }
  
  updateEventState(newState: number): Promise<UpdateResult> {
    return this.eventRepository.update({}, { state: newState });
  }
}
