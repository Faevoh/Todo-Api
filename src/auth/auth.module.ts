import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/jwtConfig';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register(jwtConfig)],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService,]
})
export class AuthModule {}
