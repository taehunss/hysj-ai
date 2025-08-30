import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/auth/decorator/public.decorator';
import { EmailSignInInput, EmailSignInOutput } from './dto/email.sign-in.dto';
import { EmailSignUpInput, EmailSignUpOutput } from './dto/email.sign-up.dto';
import { EmailSignInUsecase } from './email.sign-in.usecase';
import { EmailSignUpUsecase } from './email.sign-up.usecase';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly emailSignUpUsecase: EmailSignUpUsecase,
    private readonly emailSigninUsecase: EmailSignInUsecase,
  ) {}

  @Public()
  @ApiOperation({ summary: 'Email Sign In' })
  @ApiBody({ type: EmailSignInInput })
  @Post('email/sign-in')
  async emailLogin(
    @Body() emailDto: EmailSignInInput,
  ): Promise<EmailSignInOutput> {
    return this.emailSigninUsecase.execute(emailDto);
  }

  @Public()
  @ApiOperation({ summary: 'Email Sign Up' })
  @ApiBody({ type: EmailSignUpInput })
  @Post('email/sign-up')
  async createUser(
    @Body() input: EmailSignUpInput,
  ): Promise<EmailSignUpOutput> {
    return this.emailSignUpUsecase.execute(input);
  }
}
