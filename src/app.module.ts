import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TodoModule,TypeOrmModule.forRoot(dataSourceOptions), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
