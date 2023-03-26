//Definir objeto de typeScript para saber que atributo validar 
export class CrearUsuarioDTO {
    readonly nombre: string;
    readonly apellido: string;
    readonly usuario: string;
    readonly correo: string;
    readonly password: string;
    readonly plan: number;
}