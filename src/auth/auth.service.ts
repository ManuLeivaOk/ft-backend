import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/bcrypt';

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
  ): Promise<{ ok: boolean; msg: string; access_token?: string }> {
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

      const payload = { username: user.name, sub: user.id };

      return {
        ok: true,
        msg: 'Usuario autenticado',
        access_token: this.jwtService.sign(payload),
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
