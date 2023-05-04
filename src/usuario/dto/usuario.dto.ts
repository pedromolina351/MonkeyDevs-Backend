//Definir objeto de typeScript para saber que atributo validar
import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator"; 
import { AuthDto } from "./auth.dto";
import { PartialType } from "@nestjs/swagger";
import { ProyectoDto } from "src/proyecto/dto/proyecto.dto";
import { Type } from "class-transformer";

export class CrearUsuarioDTO extends PartialType(AuthDto) {
  @IsNotEmpty()
  readonly nombre: string;

  readonly apellido: string;

  @IsNotEmpty()
  readonly usuario: string;

  @IsNotEmpty()
  readonly plan: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProyectoDto)
  readonly proyectos?: ProyectoDto[];
}