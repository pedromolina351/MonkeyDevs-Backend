import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Usuario } from './interfaces/usuario.interface';
import { CrearUsuarioDTO } from './dto/usuario.dto';
import { hash, compare } from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsuarioService {

    constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>,
        private jwtService: JwtService) { }

    //Funcion registrar
    async registrar(userObject: CrearUsuarioDTO) {
        const { password } = userObject;
        const plainToHash = await hash(password, 10);
        userObject = { ...userObject, password: plainToHash }
        const user = await this.usuarioModel.findOne({ usuario: userObject.usuario });
        const correo = await this.usuarioModel.findOne({ correo: userObject.correo });
        if (user || correo) throw new HttpException('USUARIO_O_CORREO_DUPLICADOS', 404);
        return this.usuarioModel.create(userObject)
    }

    //Funcion Login
    async login(userObjectLogin: AuthDto) {
        //hacer consulta a la base de datos con find user
        const { correo, password } = userObjectLogin;
        const findUser = await this.usuarioModel.findOne({ correo });

        //Verificar que el usuario existe
        if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

        //verificar que el el correo y la contraseña coniciden
        const checkPassword = await compare(password, findUser.password);
        if (!checkPassword) throw new HttpException('CREDENCIALES_INCORRECTAS', 403);


        const payload = { id: findUser._id, nombre: findUser.nombre }
        const token = this.jwtService.sign(payload);

        //Si la contraseña es correcta:
        const data = {
            user: findUser,
            token
        };
        return data;

    }

    async getUsuarios(): Promise<Usuario[]> {
        const usuarios = await this.usuarioModel.find();
        return usuarios;
    }

    async getUsuario(id: any): Promise<Usuario> {
        const usuario = await this.usuarioModel.findById(id);
        return usuario;

    }

    // async createUsuario(crearUsuarioDTO: CrearUsuarioDTO): Promise<Usuario>{
    //     const usuario = new this.usuarioModel(crearUsuarioDTO);
    //     return await usuario.save();
    // }

    async deleteUsuario(id: any): Promise<Usuario> {
        const usuarioEliminado = await this.usuarioModel.findByIdAndDelete(id);
        return usuarioEliminado;

    }

    async updateUsuario(id: any, crearUsuarioDTO: CrearUsuarioDTO): Promise<Usuario> {
        const usuarioActualizado = await this.usuarioModel.findByIdAndUpdate(id, crearUsuarioDTO, { new: true });
        // con new true, le decimos que queremos retornar el usuario actualizado y no el viejo
        return usuarioActualizado;

    }

}
