import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormOptions } from './ormConfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [TodoModule,TypeOrmModule.forRoot(ormOptions), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
