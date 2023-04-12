import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHome(){
        return "Welcome to Ecommerce Application"
    }
}
