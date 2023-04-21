import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "src/Entities/user.entity";
import { Repository } from "typeorm";

export class JwtCustomStrategy extends PassportStrategy(Strategy) {

    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "mySecretJWT"
        });
    }

    async validate(payload: {userName: string, password: string}) {
        const {userName, password} = payload;

        const user = await this.repo.findOneBy({userName,password});

        if(!user) {
            throw new UnauthorizedException("You are not an authorized");
        }
        return user;
    }
}