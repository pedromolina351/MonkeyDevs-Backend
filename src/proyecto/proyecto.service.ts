import { Injectable, HttpException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proyecto } from './interfaces/proyecto.interface';
import { ProyectoDto } from './dto/proyecto.dto';
import { Usuario } from 'src/usuario/interfaces/usuario.interface';

@Injectable()
export class ProyectoService {

  constructor(
    @InjectModel('Proyecto') private readonly proyectoModel: Model<Proyecto>,
    @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>) { }

  //Funcion crear proyecto
  async createProyecto(proyectoDto: ProyectoDto): Promise<Proyecto> {
    const usuario = await this.usuarioModel.findById(proyectoDto.usuario).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario with ID '${proyectoDto.usuario}' not found`);
    }

    const maxProyectos = usuario.plan === 1 ? 3 : usuario.plan === 2 ? 5 : Infinity;
    if (usuario.proyectos.length >= maxProyectos) {
      throw new BadRequestException(`LIMIT`);
    }

    const createdProyecto = new this.proyectoModel(proyectoDto);
    usuario.proyectos.push(createdProyecto);
    await usuario.save();
    return createdProyecto.save();
  }

  //Obtener todos los proyectos de un usuario
  async obtenerProyectosPorUsuario(idUsuario: string): Promise<Proyecto[]> {
    return await this.proyectoModel.find({ usuario: idUsuario }).exec();
  }

  //Actualizar los datos de un proyecto
  async updateProyecto(id: any, proyectoDto: ProyectoDto): Promise<Proyecto> {
    const proyectoActualizado = await this.proyectoModel.findByIdAndUpdate(id, proyectoDto, { new: true });
    return proyectoActualizado;
  }

  //Eliminar un proyecto y su referencia en usuarios
  async eliminarProyecto(proyectoId: string): Promise<Proyecto> {
    const proyecto = await this.proyectoModel.findByIdAndDelete(proyectoId).exec();

    if (!proyecto) {
      throw new NotFoundException(`Proyecto con id ${proyectoId} no encontrado`);
    }

    const usuario = await this.usuarioModel
      .findOneAndUpdate(
        { _id: proyecto.usuario },
        { $pull: { proyectos: proyectoId } },
        { new: true }
      )
      .exec();

    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${proyecto.usuario} no encontrado`);
    }

    return proyecto;
  }
}
