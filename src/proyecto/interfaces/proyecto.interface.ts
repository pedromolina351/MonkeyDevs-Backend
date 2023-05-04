import { Document, Types } from 'mongoose';

export interface Proyecto extends Document {
  nombreProyecto: string;
  descripcion: string;
  archivoHTML: string;
  archivoJS: string;
  archivoCSS: string;
  usuario: Types.ObjectId;
}