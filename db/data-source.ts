import { TodoEntity } from "../src/Entities/todo.entity";
import { UserEntity } from "../src/Entities/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "my_1ROOT",
    database: "nestjs",
    entities: [TodoEntity, UserEntity],
    synchronize: false,
    migrations: ["dist/db/migrations/*.js"]
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;