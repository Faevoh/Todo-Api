import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty()
    @MaxLength(15 ,{message: "Max length must be longer than 15 character"})
    title: string;
    @IsNotEmpty()
    description: string;
}