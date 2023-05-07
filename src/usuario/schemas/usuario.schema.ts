import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Cooperativo } from 'src/cooperativo/schemas/cooperativo.schema';
import { Proyecto } from 'src/proyecto/schemas/proyecto.schema';

@Schema()
export class Usuario extends Document {
  @Prop()
  nombre: string;

  @Prop()
  apellido: string;

  @Prop()
  fechaNacimiento: Date;

  @Prop({ unique: true })
  usuario: string;

  @Prop({ unique: true })
  correo: string;

  @Prop()
  password: string;

  @Prop()
  plan: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto' }] })
  proyectos: Proyecto[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cooperativo' }] })
  cooperativo: Cooperativo[];

}

export const UserSchema = SchemaFactory.createForClass(Usuario);