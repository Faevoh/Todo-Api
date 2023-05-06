// import { Body, Controller, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
// import { UserService } from './user.service';
// import { RegisterUserDto } from 'src/DTO/registerUser.dto';
// import { UserLoginDto } from 'src/DTO/userLogin.dto';
// import { LocalAuthGuard } from 'src/auth/local-auth.guard';
// import { AuthService } from 'src/auth/auth.service';

// @Controller('user')
// export class UserController {

//     constructor(private userService: UserService, private authService: AuthService) {}

//     @Post("register")
//     register(@Body(ValidationPipe) registerDto: RegisterUserDto) {
//         return this.userService.registerUser(registerDto);
//     }

//     /*@Post("login")
//     signIn(@Body(ValidationPipe) loginDto: UserLoginDto) {
//         return this.userService.loginUser(loginDto);
//     } */

//     @UseGuards(LocalAuthGuard)
//     @Post("login")
//     login(@Request() req) {
//         console.log("Login request received")
//         return this.authService.login(req.user); 
//     }
// }

import { Body, Controller, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService, 
        private readonly authService: AuthService
    ) {}

    @Post('register')
    async register(@Body(new ValidationPipe()) registerDto: RegisterUserDto) {
        return await this.userService.registerUser(registerDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user); 
    }
}
