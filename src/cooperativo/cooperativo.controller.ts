import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { CooperativoService } from './cooperativo.service';
import { CooperativoDto } from './dto/cooperativo.dto';
import { Types } from 'mongoose';

@Controller('cooperativo')
export class CooperativoController {

    constructor(private readonly cooperativoService: CooperativoService) { }

    //Crear un proyecto cooperativo
    @Post('/:idUsuario')
    async create(@Body() cooperativoDto: CooperativoDto, @Req() req) {
        return await this.cooperativoService.crearCooperativo(req.params.idUsuario, cooperativoDto)
    }

    //Agregar usuario al proyecto
    @Put('/agregar')
    async agregarUsuario(
        @Body('email') email: string,
        @Body('cooperativoId') cooperativoId: string
    ) {
        return this.cooperativoService.agregarUsuario(email, cooperativoId);
    }

    //Obtener los proyectos de un usuario
    @Get('/:idUsuario')
    async obtenerProyectosCooperativosPorUsuario(@Param('idUsuario') userId: string) {
      const cooperativos = await this.cooperativoService.obtenerCooperativosPorUsuario(userId);
      return { cooperativos };

    }

    //Eliminar proyecto cooperativo
    @Delete('/:idUsuario/:idCooperativo/eliminar')
    async eliminarColaborativo(@Param('idUsuario') idUsuario: string, @Param('idCooperativo') idCooperativo: string) {
        const cooperativo = await this.cooperativoService.eliminarCooperativo(idUsuario,idCooperativo);
        return { cooperativo }
    }

    @Put('/update')
    async actualizarCooperativo(@Res() res, @Body() CooperativoDto: CooperativoDto, @Query('id') id) {
        const cooperativo = await this.cooperativoService.actualizarCooperativo(id, CooperativoDto);
        if (!Types.ObjectId.isValid(id) || !cooperativo) throw new NotFoundException('Id invalido');
        return res.status(HttpStatus.OK).json(cooperativo);
    }
}
