//Definir objeto de typeScript para saber que atributo validar
import { IsNotEmpty } from "class-validator"; 
import { AuthDto } from "./auth.dto";
import { PartialType } from "@nestjs/swagger";

export class CrearUsuarioDTO extends PartialType(AuthDto){
    @IsNotEmpty()
    readonly nombre: string;
    readonly apellido: string;
    @IsNotEmpty()
    readonly usuario: string;
    
    @IsNotEmpty()
    readonly plan: number; 
}