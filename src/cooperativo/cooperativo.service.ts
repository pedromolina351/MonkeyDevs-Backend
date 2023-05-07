import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from 'src/usuario/interfaces/usuario.interface';
import { Cooperativo } from './interfaces/cooperativo.interface';
import { CooperativoDto } from './dto/cooperativo.dto';
import { omit } from 'lodash';

@Injectable()
export class CooperativoService {
  constructor(
    @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>,
    @InjectModel('Cooperativo') private readonly cooperativoModel: Model<Cooperativo>) { }

  //Crear cooperativo
  async crearCooperativo(userId: string, dto: CooperativoDto) {
    const usuario = await this.usuarioModel.findById(userId);
    const maxCooperativos = usuario.plan === 1 ? 1 : usuario.plan === 2 ? 5 : Infinity;
    if (usuario.cooperativo.length >= maxCooperativos) {
      throw new BadRequestException('PROJECT_LIMIT');
    }
    const nuevoCooperativo = new this.cooperativoModel(dto);
    usuario.cooperativo.push(nuevoCooperativo);
    await usuario.save();
    return nuevoCooperativo.save();
  }

  //Agregar usuario al proyecto por medio de su email
  async agregarUsuario(email: string, cooperativoId: string) {
    // Busca al usuario por su correo electrónico
    const usuario = await this.usuarioModel.findOne({ correo: email });
    if (!usuario) {
      throw new NotFoundException('NO_EMAIL');
    }

    // Verifica que el cooperativo existe
    const cooperativo = await this.cooperativoModel.findById(cooperativoId);
    if (!cooperativo) {
      throw new NotFoundException('No se encontró el cooperativo con el ID proporcionado');
    }

    // Verifica que el usuario tenga permiso para unirse al proyecto
    const maxCooperativos = usuario.plan === 1 ? 1 : usuario.plan === 2 ? 5 : Infinity;
    if (usuario.cooperativo.length >= maxCooperativos) {
      throw new BadRequestException('PROJECT_LIMIT');
    }

    // Verifica que el usuario no esté ya agregado al cooperativo
    if (cooperativo.usuarios.includes(usuario._id)) {
      throw new BadRequestException('REPETIDO');
    }

    // Agrega el ID del cooperativo al arreglo usuarios de la colección cooperativo
    cooperativo.usuarios.push(usuario._id);
    await cooperativo.save();

    // Agrega el ID del usuario al arreglo cooperativo de la colección usuario
    usuario.cooperativo.push(cooperativo._id);
    await usuario.save();
  }

  //Obtener todos los Cooperativos con el id del usuario
  async obtenerCooperativosPorUsuario(userId: string): Promise<Cooperativo[]> {
    const usuario = await this.usuarioModel.findById(userId).populate('cooperativo');
    if (!usuario) {
      throw new NotFoundException(`No se encontró un usuario con el id ${userId}`);
    }
    return usuario.cooperativo;
  }

  async eliminarCooperativo(userId: string, cooperativoId: string) {
    // Encuentra el usuario por su ID
    const usuario = await this.usuarioModel.findById(userId);
    if (!usuario) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    // Encuentra el cooperativo por su ID
    const cooperativo = await this.cooperativoModel.findById(cooperativoId);
    if (!cooperativo) {
      throw new NotFoundException('COOPERATIVE_NOT_FOUND');
    }

    // Encuentra el índice del cooperativo en el arreglo del usuario
    const indexUsuario = usuario.cooperativo.indexOf(cooperativoId);
    if (indexUsuario === -1) {
      throw new NotFoundException('COOPERATIVE_NOT_FOUND_IN_USER');
    }

    // Elimina el cooperativo del arreglo del usuario y guarda los cambios
    usuario.cooperativo.splice(indexUsuario, 1);
    await usuario.save();

    // Encuentra el índice del usuario en el arreglo del cooperativo
    const indexCooperativo = cooperativo.usuarios.indexOf(userId);
    if (indexCooperativo === -1) {
      throw new NotFoundException('USER_NOT_FOUND_IN_COOPERATIVE');
    }

    // Elimina el usuario del arreglo del cooperativo
    cooperativo.usuarios.splice(indexCooperativo, 1);

    // Si ya no hay usuarios en el cooperativo, borra el documento
    if (cooperativo.usuarios.length === 0) {
      await cooperativo.deleteOne();
    } else {
      // Guarda los cambios en el cooperativo
      await cooperativo.save();
    }
  }

  //Actualizar los datos de un proyecto
  async actualizarCooperativo(id: any, cooperativoDto: CooperativoDto): Promise<Cooperativo> {
    const omitKeys = ['usuarios', 'nombreProyecto', 'descripcion'];
    const cooperativoActual = await this.cooperativoModel.findById(id);
    if (!cooperativoActual) {
      throw new NotFoundException('No se encontró el cooperativo con el ID proporcionado');
    }
    const cooperativoActualizado = Object.assign(cooperativoActual, omit(cooperativoDto, omitKeys));
    await cooperativoActualizado.save();
    return cooperativoActualizado;
  }

}
