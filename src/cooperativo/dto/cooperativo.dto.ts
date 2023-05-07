import { IsNotEmpty, IsArray } from 'class-validator';

export class CooperativoDto {
  @IsNotEmpty()
  readonly nombreProyecto: string;

  @IsNotEmpty()
  readonly descripcion: string;

  readonly archivoHTML: string;

  readonly archivoJS: string;

  readonly archivoCSS: string;

  @IsArray()
  readonly usuarios: string[];
}