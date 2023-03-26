import { Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UsuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    fechaNacimiento: Date,
    usuario: String,
    correo: String,
    password: String,
    plan: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UsuarioSchema.pre('save', async function (next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      return next();
    } catch (error) {
      return next(error);
    }
  });


