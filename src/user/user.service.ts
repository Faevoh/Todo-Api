import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { UserEntity } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt  from 'bcryptjs';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>, private jwt: JwtService) {}

    async registerUser(registerDto: RegisterUserDto) {
        const {fullName, userName, password} = registerDto;
        const hashed  = await bcrypt.hash(password, 12);
        const salt = await bcrypt.getSalt(hashed);

        const user = new UserEntity();
        user.fullName = fullName;
        user.userName = userName;
        user.password = hashed;
        user.salt = salt

        this.repo.create(user);

        try{
            return await this.repo.save(user);
        }catch(err){
            throw new InternalServerErrorException("Something went wrong, User was not created");
        }
    }

    // async loginUser(userLogindto: UserLoginDto) {
    //     const {userName, password} = userLogindto;
    //     console.log(userLogindto.password)

    //     const user = await this.repo.findOneBy({userName});
    //     console.log(user)

    //     if(!user) {
    //         throw new UnauthorizedException("Iwrong Credentials");
    //     }

    //     const isPasswordMatch = await bcrypt.compareSync(password,user.password);
    //     console.log(isPasswordMatch)

    //     if(isPasswordMatch) {

    //     }
    
    // }

    async loginUser(userLoginDto: UserLoginDto) {
        const {userName, password} = userLoginDto

        const user = await this.repo.findOneBy({userName});
        const isPassword = await bcrypt.compare(password, user.password);
        
        if(!user) {
            throw new UnauthorizedException("Invalid credential");
        }
        
        if(isPassword) {
            const jwtPayload = {userName};
            const jwtToken = await this.jwt.signAsync(jwtPayload, {expiresIn: "1d", algorithm: "HS512"});
            return {token: jwtToken, message: "Login Successful"}
        }else{
            throw new UnauthorizedException("Invalid Credential");
        }
    }
}
