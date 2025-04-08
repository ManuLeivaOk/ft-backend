import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { getColorById } from 'src/utils/getColour';
import { hashedPassword } from 'src/utils/bcrypt';
import { Dni } from 'src/events-and-questions/entities/dni.entity';
import { SafeUser } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Dni)
    private readonly dniRepository: Repository<Dni>,
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: [
          { documentNumber: userData.documentNumber as string },
          { email: userData.email },
        ],
      });

      if (existingUser) {
        throw new BadRequestException(
          'El DNI o el email ya están registrados.',
        );
      }

      /* const existingDNI = await this.dniRepository.findOne({
        where: [{ dni: userData.documentNumber }],
      });

      if (!existingDNI) {
        throw new BadRequestException('El DNI no esta registrado.');
      } */

      const lastUser = await this.userRepository.find({
        take: 1,
        order: { id: 'DESC' },
      });

      const newId = lastUser.length > 0 ? lastUser[0].id + 1 : 1;

      const color = getColorById(newId);

      const encryptPass: string = await hashedPassword(userData.password);
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      const newUser = this.userRepository.create({
        ...userData,
        type: 1,
        group: randomNumber,
        id: newId,
        colour: color,
        password: encryptPass,
        state: 'firstStep',
      });

      const savedUser = await this.userRepository.save(newUser);

      savedUser.password = '**********';

      return savedUser;
    } catch (error) {
      console.error('Error en la creación del usuario:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error al crear el usuario. Por favor, intenta más tarde.',
      );
    }
  }

  async changeFirstState(
    code: string,
    documentNumber: string,
  ): Promise<SafeUser> {
    try {
      if (code !== '894789') {
        throw new BadRequestException('Código incorrecto');
      }

      const user = await this.userRepository.findOne({
        where: { documentNumber: documentNumber },
      });

      if (!user) {
        throw new BadRequestException('El usuario no existe');
      }

      user.state = 'secondStep';

      await this.userRepository.save(user);
      const safeUser: SafeUser = {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        documentNumber: user.documentNumber,
        colour: user.colour,
        state: user.state,
        type: JSON.stringify(user.type),
        group: user.group,
      };
      return safeUser;
    } catch (error) {
      console.error('Error en la validación del usuario:', error);

      if (error instanceof BadRequestException) {
        throw error; // Este error incluye el mensaje en la respuesta
      }

      throw new InternalServerErrorException(
        'Error al cambiar el estado del usuario',
      );
    }
  }

  async selectGroup(
    documentNumber: string,
    idGroup: string,
  ): Promise<SafeUser> {
    try {
      const user = await this.userRepository.findOne({
        where: { documentNumber: documentNumber },
      });

      if (!user) {
        throw new BadRequestException('El usuario no existe');
      }

      user.group = Number(idGroup);
      user.state = 'fourthStep';

      await this.userRepository.save(user);
      const safeUser: SafeUser = {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        documentNumber: user.documentNumber,
        colour: user.colour,
        state: user.state,
        type: JSON.stringify(user.type),
        group: user.group,
      };
      return safeUser;
    } catch (error) {
      console.error('Error en la validación del usuario:', error);

      if (error instanceof BadRequestException) {
        throw error; // Este error incluye el mensaje en la respuesta
      }

      throw new InternalServerErrorException(
        'Error al cambiar el estado del usuario',
      );
    }
  }

  async updateSession(documentNumber: string): Promise<SafeUser> {
    try {
      const user = await this.userRepository.findOne({
        where: { documentNumber: documentNumber },
      });

      if (!user) {
        throw new BadRequestException('El usuario no existe');
      }

      await this.userRepository.save(user);
      const safeUser: SafeUser = {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        documentNumber: user.documentNumber,
        colour: user.colour,
        state: user.state,
        type: JSON.stringify(user.type),
        group: user.group,
      };

      return safeUser;
    } catch (error) {
      console.error('Error en la validación del usuario:', error);

      if (error instanceof BadRequestException) {
        throw error; // Este error incluye el mensaje en la respuesta
      }

      throw new InternalServerErrorException(
        'Error al cambiar el estado del usuario',
      );
    }
  }
}
