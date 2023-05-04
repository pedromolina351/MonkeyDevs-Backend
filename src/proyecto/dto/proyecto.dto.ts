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
  @IsNotEmpty()
  archivoHTML: string;

  @IsString()
  @IsNotEmpty()
  archivoJS: string;

  @IsString()
  @IsNotEmpty()
  archivoCSS: string;

  @IsNotEmpty()
  usuario: Types.ObjectId;
}