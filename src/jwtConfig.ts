import { JwtModuleOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleOptions = {
    secret: "mySecretJWT",
    signOptions: {
        algorithm: "HS512",
        expiresIn: "1d"
    }
}