import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    fullName: string;
    @IsNotEmpty()
    userName: string;
    @IsNotEmpty()
    @MinLength(6) @MaxLength(12)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ ,{
         message: "Password is too weak, Choose a stronger password with 6 to 12 characters"})
    password: string;
}