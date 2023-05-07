import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cooperativo extends Document {
  @Prop()
  nombreProyecto: string;

  @Prop()
  descripcion: string;

  @Prop()
  archivoHTML: string;

  @Prop()
  archivoJS: string;

  @Prop()
  archivoCSS: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }] })
  usuarios: mongoose.Types.ObjectId[];
}

export const CooperativoSchema = SchemaFactory.createForClass(Cooperativo);