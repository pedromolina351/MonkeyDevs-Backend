import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Usuario } from './interfaces/usuario.interface';
import { CrearUsuarioDTO } from './dto/usuario.dto';

@Injectable()
export class UsuarioService {

    constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>){}

    async getUsuarios(): Promise<Usuario[]>{
        const usuarios = await this.usuarioModel.find();
        return usuarios;
    }

    async getUsuario(id:any): Promise<Usuario>{
        const usuario = await this.usuarioModel.findById(id);
        return usuario;

    }

    async createUsuario(crearUsuarioDTO: CrearUsuarioDTO): Promise<Usuario>{
        const usuario = new this.usuarioModel(crearUsuarioDTO);
        return await usuario.save();
    }

    async deleteUsuario(id:any): Promise<Usuario>{
        const usuarioEliminado = await this.usuarioModel.findByIdAndDelete(id);
        return usuarioEliminado;

    }

    async updateUsuario(id:any, crearUsuarioDTO: CrearUsuarioDTO): Promise<Usuario>{
        const usuarioActualizado = await this.usuarioModel.findByIdAndUpdate(id,crearUsuarioDTO, {new:true});
        // con new true, le decimos que queremos retornar el usuario actualizado y no el viejo
        return usuarioActualizado;

    }
    
}
