import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoDto } from './dto/proyecto.dto';
import { Proyecto } from './interfaces/proyecto.interface';

@Controller('proyecto')
export class ProyectoController {

    constructor(private readonly proyectoService: ProyectoService) { }

    @Post('/')
    async create(@Body() proyectoDto: ProyectoDto) {
        return await this.proyectoService.createProyecto(proyectoDto);
    }

    @Get(':idUsuario/proyectos')
    async obtenerProyectosPorUsuario(@Param('idUsuario') idUsuario: string): Promise<Proyecto[]> {
        return await this.proyectoService.obtenerProyectosPorUsuario(idUsuario);
    }
}
