import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';

@Controller('home')
export class AppController {
    constructor(
        private readonly appService: AppService
    ){}
    @Get()
    @Public()
    getHome(){
        return this.appService.getHome();
    }
}
