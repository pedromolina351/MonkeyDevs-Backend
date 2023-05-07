import { Document } from "mongoose";
import { Proyecto } from 'src/proyecto/interfaces/proyecto.interface';
import { Cooperativo } from 'src/cooperativo/interfaces/cooperativo.interface';
export interface Usuario extends Document {
  readonly nombre: string;
  readonly apellido: string;
  readonly usuario: string;
  readonly correo: string;
  readonly password: string;
  readonly plan: number;
  readonly createdAt: Date;
  proyectos?: Proyecto['_id'][];
  cooperativo?: Cooperativo['_id'][];
}
