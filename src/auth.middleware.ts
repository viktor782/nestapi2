import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req, res, next) {
    if (req.user && req.user._id) {
      req.userId = req.user._id;
      next();
    } else {
      req.userId = 'anonymous';
      next();
    }
  }
}
