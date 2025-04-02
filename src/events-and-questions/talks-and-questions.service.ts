/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Talks } from './entities/talks.entity';
import { Questions } from './entities/questions.entity';
import { User } from 'src/users/entity/user.entity';
import { Event } from './entities/event.entity';
import { Dni } from './entities/dni.entity';

@Injectable()
export class TalksAndQuestionsService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Questions)
    private questionsRepository: Repository<Questions>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Dni) private dniRepository: Repository<Dni>,
    @InjectRepository(Talks)
    private readonly talkRepository: Repository<Talks>,
  ) {}

  findAll(): Promise<Talks[]> {
    return this.talkRepository.find();
  }

  async createQuestion(
    questionText: string,
    userId: number,
    talkId: number,
  ): Promise<Questions> {
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

  findAllQuestionsByUser(userId: number): Promise<Questions[]> {
    return this.questionsRepository.find({
      where: { user: { id: userId } },
    });
  }

  getEventState(): Promise<Event | null> {
    return this.eventRepository.findOne({ where: {}, order: { id: 'ASC' } });
  }

  updateEventState(newState: number): Promise<UpdateResult> {
    console.log('newState', newState);

    return this.eventRepository.update({ id: 1 }, { state: newState });
  }

  addDni(dni: number): Promise<Dni> {
    return this.dniRepository.save({ dni });
  }

  getEvents() {
    return [
      {
        id: 1,
        name: 'Quiero emprender',
        description:
          'Tengo una idea o un sueño que me gustaría transformar en un proyecto propio. Me motiva ser independiente, crear algo mío y desafiarme a crecer desde cero.',
      },
      {
        id: 2,
        name: 'Quiero trabajar',
        description:
          'Siento que es momento de insertarme en el mundo laboral. Quiero ganar experiencia, tener independencia económica y aprender haciendo.',
      },
      {
        id: 3,
        name: 'Quiero estudiar en la facultad',
        description:
          'Me gustaría seguir formándome. Estoy interesado en una carrera universitaria o terciaria que me permita desarrollar una profesión y prepararme para el futuro.',
      },
      {
        id: 4,
        name: 'Lo estoy pensando',
        description:
          'Todavía no tengo claro qué quiero hacer, pero estoy abierto a descubrirlo. Me estoy conociendo, explorando opciones y necesito tiempo para decidir con calma.',
      },
      {
        id: 5,
        name: 'Quiero combinar varias cosas',
        description:
          'Tal vez estudie y trabaje a la vez, o emprenda mientras me capacito. Me motiva hacer más de una cosa a la vez y probar distintos caminos hasta encontrar el mío.',
      }
    ];
  }
}
