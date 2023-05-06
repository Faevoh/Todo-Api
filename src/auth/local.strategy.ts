import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: "userName"
        });
    }

    async validate(userName: string, password: string) {
        try{
            // console.log("Does this validate work?")
            const user = await this.authService.validateUser(userName,password);
            // console.log(userName)
            if(!user) {
                throw new UnauthorizedException();
            }
            return user;
            
        }catch(err){
            throw new UnauthorizedException(err.message, "message2: Not working")
        }
       
    }
}
