import { IsEmail, MaxLength, MinLength } from "class-validator";

export class AuthDto {
    @IsEmail()
    correo: string;

    @MinLength(4)
    @MaxLength(15)
    password: string;
}