import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProyectoController } from './proyecto.controller';
import { ProyectoService } from './proyecto.service';
import { ProyectoSchema } from './schemas/proyecto.schema';
import { UserSchema } from '../usuario/schemas/usuario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ('Proyecto'), schema: ProyectoSchema },
      { name: ('Usuario'), schema: UserSchema },
    ])
  ],
  controllers: [ProyectoController],
  providers: [ProyectoService]
})
export class ProyectoModule {}
