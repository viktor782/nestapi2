import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req, res, next) {
    req.userId = req.user._id;
    next();
  }
}
