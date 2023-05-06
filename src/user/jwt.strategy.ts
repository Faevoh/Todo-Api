import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "src/Entities/user.entity";
import { Repository } from "typeorm";

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "mySecretJWT"
        });
    }

    async validate(payload) {
        return {
            id: payload.sub,
            userName: payload.userName
        }
    }
}