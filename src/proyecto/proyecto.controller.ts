import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoDto } from './dto/proyecto.dto';
import { Types } from 'mongoose';
import { Proyecto } from './interfaces/proyecto.interface';

@Controller('proyecto')
export class ProyectoController {

    constructor(private readonly proyectoService: ProyectoService) { }

    //Crear usuario
    @Post('/')
    async create(@Body() proyectoDto: ProyectoDto) {
        return await this.proyectoService.createProyecto(proyectoDto);
    }

    //Obtener proyectos de un usuario
    @Get(':idUsuario/proyectos')
    async obtenerProyectosPorUsuario(@Param('idUsuario') idUsuario: string): Promise<Proyecto[]> {
        return await this.proyectoService.obtenerProyectosPorUsuario(idUsuario);
    }

    //Actualizar un proyecto
    @Put('/update')
    async actualizarProyecto(@Res() res, @Body() proyectoDto: ProyectoDto, @Query('id') id) {
        const proyecto = await this.proyectoService.updateProyecto(id, proyectoDto);
        if (!Types.ObjectId.isValid(id) || !proyecto) throw new NotFoundException('Id invalido');
        return res.status(HttpStatus.OK).json(proyecto);
    }

    //Eliminar un proyecto
    @Delete(':idProyecto/eliminar')
    async eliminarProyecto(@Param('idProyecto') idProyecto: string ): Promise<Proyecto>{
        const proyecto = await this.proyectoService.eliminarProyecto(idProyecto);
        return proyecto;
    }
}
