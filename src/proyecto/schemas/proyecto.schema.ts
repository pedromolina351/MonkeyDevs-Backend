import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';


@Schema()
export class Proyecto {
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

  @Prop({
    type: Types.ObjectId,
    ref: 'Usuario',
    required: true,
  })
  usuario: Types.ObjectId;
}

export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);