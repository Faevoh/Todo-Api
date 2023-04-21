import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TodoEntity } from "./Entities/todo.entity";
import { UserEntity } from "./Entities/user.entity";

export const ormOptions: TypeOrmModuleOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "my_1ROOT",
    database: "nestjs",
    entities: [TodoEntity, UserEntity],
    synchronize: true
}