import { Document } from 'mongoose';
import { Usuario } from 'src/usuario/interfaces/usuario.interface';

export interface Cooperativo extends Document {
  readonly nombreProyecto: string;
  readonly descripcion: string;
  readonly archivoHTML: string;
  readonly archivoJS: string;
  readonly archivoCSS: string;
  usuarios: Usuario['_id'][];
}