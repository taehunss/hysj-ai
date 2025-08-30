import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LOGGER, Logger } from 'src/common/logger/logger.interface';
import { EnvConfigService } from 'src/infrastructure/env-config/env-config.service';
import { JwtDomainService } from './domain/jwt.domain-service';
import {
  USER_REPOSITORY,
  UserRepository,
} from './domain/user.repository.interface';
import { EmailSignInInput, EmailSignInOutput } from './dto/email.sign-in.dto';

@Injectable()
export class EmailSignInUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(LOGGER)
    private readonly logger: Logger,
    private readonly configService: EnvConfigService,
    private readonly jwtService: JwtDomainService,
  ) {}

  async execute(input: EmailSignInInput): Promise<EmailSignInOutput> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      this.logger.error(`User not found: ${input.email}`);
      throw new UnauthorizedException('User not found');
    }
    if (!(await user.validatePassword(input.password))) {
      this.logger.error(`Invalid password: ${input.email}`);
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = this.jwtService.sign({
      code: user.code,
      name: user.nickname,
      email: user.email,
    });

    return {
      accessToken,
    };
  }
}
