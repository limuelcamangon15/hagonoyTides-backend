import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get('/health')
  getHealth() {
    return {
      status: 'ok',
    };
  }
}
