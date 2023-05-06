import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(userName: string, password: string) {
        const user = await this.userService.findOneBy(userName);
        
        // console.log("rest",user,password)
        if(await bcrypt.compare(password, user.password)) {
            // const {password, userName, ...others} = user;
            // console.log(others)
            console.log(user)
            return user;
        }
        return null;
        
    }

    async login (user) {
        const payload = {userName: user.userName, sub: user.id};

        return{
            access_token: this.jwtService.sign(payload)
        }
    }
}
