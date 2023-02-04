import {PassportStrategy} from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import configuration from "src/configs/configuration";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
    ){            
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configuration().jwt.secret
        });
    }
    async validate(payload: any){
        return payload;

    }
}