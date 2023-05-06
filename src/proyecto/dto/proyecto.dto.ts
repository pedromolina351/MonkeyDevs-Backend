import { IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class ProyectoDto {
  @IsString()
  @IsNotEmpty()
  nombreProyecto: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  archivoHTML: string;

  @IsString()
  archivoJS: string;

  @IsString()
  archivoCSS: string;

  @IsNotEmpty()
  usuario: Types.ObjectId;
}