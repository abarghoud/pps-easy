import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable
} from '@nestjs/common';
import { Request } from 'express';

import { Observable } from 'rxjs';

import { IRecaptchaChecker, IRecaptchaCheckerSymbol } from '@pps-easy/recaptcha/contracts';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  public constructor(@Inject(IRecaptchaCheckerSymbol) private readonly recaptchaChecker: IRecaptchaChecker) {
  }

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (!request.body) {
      return false;
    }

    if (!request.body.recaptchaToken) {
      throw new BadRequestException('Body must contain recaptchaToken');
    }

    return new Promise<boolean>((resolve, reject) => {
      this.recaptchaChecker.check(request.body.recaptchaToken).then((result) => {
        if (!result.isValid || result.score <= 0.5) {
          reject(new ForbiddenException());

          return;
        }

        resolve(true);
      });
    });
  }
}
