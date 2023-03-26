import { Controller, Get, Post, Put, Delete, Res, HttpStatus,
         Body, Param, NotFoundException, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { CrearUsuarioDTO } from './dto/usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')//Esta será la ruta inicial, las subrutas se definen abajo.
export class UsuarioController {

    constructor(private usuarioService: UsuarioService){}

    /*Crear un nuevo usuario, para esto utilizamos el servicio createUsuario*/
    @Post('/crear')
    async createPost(@Res() res, @Body() crearUsuarioDTO: CrearUsuarioDTO){
        const usuario = await this.usuarioService.createUsuario(crearUsuarioDTO);
        return res.status(HttpStatus.OK).json({
            message:'Usuario creado correctamente',
            user: usuario
        })
    }

    /*Obtener los usuarios, para esto utilizamos el servicio getUsuarios*/
    @Get('/')
    async obtenerUsuarios(@Res() res){
        const usuarios = await this.usuarioService.getUsuarios();
        return res.status(HttpStatus.OK).json({
            usuarios
        });
    }

    /*Obtener un usuario, con el servicio getUsuario*/
    @Get('/:id')
    async obtenerUsuario(@Res() res, @Param('id') id){
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException('ID de usuario no válido');
        }
        const usuario = await this.usuarioService.getUsuario(id);
        if (!usuario) {
            throw new NotFoundException('No se encontró el usuario');
        }
        return res.status(HttpStatus.OK).json({usuario});
    }
    /*Eliminar un usuario con el servicio deleteUsuario */
    @Delete('/eliminar/:id')
    async eliminarUsuario(@Res() res, @Param('id') id){
        if(!Types.ObjectId.isValid(id)){
            throw new NotFoundException('ID de usuario invalido');
        }
        const usuario = await this.usuarioService.deleteUsuario(id);
        if(!usuario) throw new NotFoundException('No se encontro el usuario');
        return res.status(HttpStatus.OK).json(usuario);
    }

    // Actualizar un usuario con el servicio updateUsuario
    @Put('/update')
    async actualizarUsuario(@Res() res, @Body() crearUsuarioDTO: CrearUsuarioDTO, @Query('id') id){
        const usuario = await this.usuarioService.updateUsuario(id,crearUsuarioDTO);
        if(!Types.ObjectId.isValid(id) || !usuario) throw new NotFoundException('Id invalido');
        return res.status(HttpStatus.OK).json(usuario);
    }
}
