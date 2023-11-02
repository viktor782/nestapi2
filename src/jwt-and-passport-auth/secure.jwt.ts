import { Controller, Get, Req } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
  @Get()
  getProfile(@Req() req) {
    return {
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token,
    };
  }
}
