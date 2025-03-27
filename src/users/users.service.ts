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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

      const lastUser = await this.userRepository.find({
        take: 1,
        order: { id: 'DESC' },
      });

      const newId = lastUser.length > 0 ? lastUser[0].id + 1 : 1;
      const color = getColorById(newId);

      const encryptPass: string = await hashedPassword(userData.password);
      const randomNumber = Math.floor(Math.random() * 6) + 1; // Se le asigna desde el comienzo el grupo, para que en la siguiente fase del evento ya quede
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
}
