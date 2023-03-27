//Definir objeto de typeScript para saber que atributo validar
import { IsNotEmpty } from "class-validator"; 
export class CrearUsuarioDTO {
    @IsNotEmpty()
    readonly nombre: string;
    readonly apellido: string;
    @IsNotEmpty()
    readonly usuario: string;
    @IsNotEmpty()
    readonly correo: string;
    @IsNotEmpty()
    readonly password: string;
    @IsNotEmpty()
    readonly plan: number; 
}