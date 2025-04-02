import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/bcrypt';

export type SafeUser = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  documentNumber: string;
  colour: string;
  state: string;
  type: string;
  group: number;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    dni: string,
    password: string,
  ): Promise<{
    ok: boolean;
    msg: string;
    access_token?: string;
    user: SafeUser;
  }> {
    try {
      const user = await this.userRepository.findOne({
        where: { documentNumber: dni },
      });

      if (!user) {
        throw new UnauthorizedException('DNI o contraseña incorrectos');
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('DNI o contraseña incorrectos');
      }

      const payload = {
        username: user.name,
        sub: user.id,
        documentNumber: user.documentNumber,
      };
      const access_token = this.jwtService.sign(payload, { expiresIn: '4h' });

      await this.userRepository.update(user.id, { token: access_token });
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

      return {
        ok: true,
        msg: 'Usuario autenticado',
        access_token: access_token,
        user: safeUser,
      };
    } catch (error) {
      console.error('Error en la validación del usuario:', error);

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new InternalServerErrorException('Error al autenticar al usuario');
    }
  }
}
