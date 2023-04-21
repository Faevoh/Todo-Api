import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/jwtConfig';
import { PassportModule } from '@nestjs/passport';
import { JwtCustomStrategy } from './jwt-custom.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register(jwtConfig), PassportModule.register({defaultStrategy: "jwt"})],
  controllers: [UserController],
  providers: [UserService, JwtCustomStrategy],
  exports: [PassportModule, JwtCustomStrategy ]
})
export class UserModule {}
