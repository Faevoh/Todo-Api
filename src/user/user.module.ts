import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/jwtConfig';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register(jwtConfig), PassportModule/*.register({defaultStrategy: "jwt"})*/],
  controllers: [UserController],
 providers: [UserService,AuthService, JwtStrategy],
  exports: [UserService,PassportModule]
})
export class UserModule {}
