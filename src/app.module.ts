import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormOptions } from './ormConfig';
import { UserModule } from './user/user.module';

@Module({
  imports: [TodoModule,TypeOrmModule.forRoot(ormOptions), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}