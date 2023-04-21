import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { UserLoginDto } from 'src/DTO/userLogin.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post("register")
    register(@Body(ValidationPipe) registerDto: RegisterUserDto) {
        return this.userService.registerUser(registerDto);
    }

    @Post("login")
    signIn(@Body(ValidationPipe) loginDto: UserLoginDto) {
        return this.userService.loginUser(loginDto);
    }
}
