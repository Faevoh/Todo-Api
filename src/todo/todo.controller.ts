import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/DTO/create-todo.dto';
import { TodoStatus } from 'src/Entities/todo.entity';
import { TodoStatusValidationPipe } from 'src/pipes/TodoStatusValidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.decorator';
import { UserEntity } from 'src/Entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {

    constructor(private todoService: TodoService) {}

    // Route for user to get Todos created by self
    @Get() 
    getAllTodo( @User() user: UserEntity ) {
    //     console.log(this.todoService.getAllTodos());  
    return this.todoService.getAllTodos(user);
    }

    // 
    @Get(":id")
    getSingleTodo(
        @Param("id") id: number,
        @User() user: UserEntity) {
        return this.todoService.getOneTodo(id,user)
    }

    // Route for user to create new todo for self
    @Post()
    createNewTodo(@Body(ValidationPipe ) data: CreateTodoDto, @User() user: UserEntity) {
        return this.todoService.createTodo(data, user);
    }

    @Patch(":id")
    updateTodo(@Body("status", TodoStatusValidationPipe ) status: TodoStatus,
    @Param("id") id: number,
    @User() user: UserEntity
    ) {
        return this.todoService.update(id, status,user);
    }

    @Delete(":id")
    deleteTodo(@Param("id") id: number, @User() user: UserEntity) {
        return this.todoService.delete(id, user);
    }

    // Route to get all Todo
    // @Get() 
    // getAllTodo() {
    // //     console.log(this.todoService.getAllTodos());  
    // return this.todoService.getAllTodos();
    // }

    // Route to create Todo
    // @Post()
    // createNewTodo(@Body(ValidationPipe ) data: CreateTodoDto) {
    //     return this.todoService.createTodo(data);
    // }

    // Route to update Todo status
    // @Patch(":id")
    // updateTodo(@Body("status", TodoStatusValidationPipe ) status: TodoStatus,
    // @Param("id") id: number
    // ) {
    //     return this.todoService.update(id, status);
    // }

    // Route to delete Todo
    // @Delete(":id")
    // deleteTodo(@Param("id") id: number) {
    //     return this.todoService.delete(id);
    // }
}
 