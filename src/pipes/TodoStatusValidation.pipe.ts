import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TodoStatus } from "src/Entities/todo.entity";

export class TodoStatusValidationPipe implements PipeTransform {
    readonly allowedStatus: TodoStatus[] = [TodoStatus.OPEN, TodoStatus.IN_PROGRESS, TodoStatus.COMPLETED];


    transform(value: any, metadata: ArgumentMetadata): any {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an Invalid Status`)
        }
        return value;
    }

    
    private isStatusValid(status: any) {
        const index = this.allowedStatus.indexOf(status);

        return index !== -1;
    }
}