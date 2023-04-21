import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { CreateTodoDto } from 'src/DTO/create-todo.dto';
import { TodoEntity, TodoStatus } from 'src/Entities/todo.entity';
import { UserEntity } from 'src/Entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TodoService {

    constructor(@InjectRepository(TodoEntity) private repo: Repository<TodoEntity>) {}

    async getAllTodos(user: UserEntity): Promise<TodoEntity[]> {
        const query = await this.repo.createQueryBuilder("todo");

        query.where("todo.userId = :userId", {userId: user.id});

        try{
            return await query.getMany()
        }catch(err){
            throw new NotFoundException("Todo not Found")
        }
    }

    async getOneTodo(id: number, user: UserEntity) {
        const singleTodo = await this.repo.findOne({where: {id, userId: user.id}});
        if(!singleTodo) {
            throw new NotFoundException("To do does not exist");
        }
        return singleTodo;
    }

    async createTodo(createTodoDto: CreateTodoDto, user: UserEntity): Promise<TodoEntity> {
        const todo = new TodoEntity();
        const {title,description} = createTodoDto
        todo.title = title;
        todo.description = description;
        todo.status = TodoStatus.OPEN;
        todo.userId = user.id

        this.repo.create(todo);
        try{
            return await this.repo.save(todo);
        }catch(err){
            throw new InternalServerErrorException("Something went wrong, todo not created")
        }
    }

    async update(id: number, status: TodoStatus, user: UserEntity): Promise<TodoEntity> {
        try{
            await this.repo.update({id, userId: user.id}, {status});
            return this.repo.findOneBy({id});
        }catch(err){
            throw new InternalServerErrorException("Something went wrong");
        }
    }

    async delete(id: number, user: UserEntity) {
        const result = await this.repo.delete({id, userId: user.id});
        
        if(result.affected === 0) {
            throw new NotFoundException("Todo was not Deleted, You are not authorized to delete this.");
        }else{
            return {success: true, message: "Sucessfully deleted"};
        } 
    }

}




//     async getAllTodos(): Promise<TodoEntity[]> {
//         return await this.repo.find();
//     }

// async delete(id: number): Promise<DeleteResult> {
//     try{
//         return await this.repo.delete({id} );
//     }catch(err){
//         throw new InternalServerErrorException("Something went wrong");
//     }
// }