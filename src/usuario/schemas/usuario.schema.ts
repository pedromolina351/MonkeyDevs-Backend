


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Usuario {
   @Prop()
   nombre: String;

   @Prop()
   apellido: String

   @Prop()
   fechaNacimiento: Date

   @Prop({unique:true})
   usuario: String;

   @Prop({unique:true})
   correo: String;

   @Prop()
   password: String;

   @Prop()
   plan: number;

}

export const UserSchema = SchemaFactory.createForClass(Usuario);


// import * as bcrypt from 'bcrypt';

// export const UsuarioSchema = new Schema({
//     nombre: String,
//     apellido: String,
//     fechaNacimiento: Date,
//     usuario: {
//       type: String,
//       unique: true
//     },
//     correo: {
//       type: String,
//       unique: true
//     },
//     password: String,
//     plan: Number,
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// UsuarioSchema.pre('save', async function (next) {
//     try {
//       if (!this.isModified('password')) {
//         return next();
//       }
//       const hashedPassword = await bcrypt.hash(this.password, 10);
//       this.password = hashedPassword;
//       return next();
//     } catch (error) {
//       return next(error);
//     }
//   });



