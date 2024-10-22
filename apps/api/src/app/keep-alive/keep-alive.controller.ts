import { Controller, Get } from '@nestjs/common';

@Controller('/keep-alive')
export class KeepAliveController {
  @Get()
  public get(): string {
    return 'Hello World';
  }
}
