import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'
import { ProyectoModule } from './proyecto/proyecto.module';
import { CooperativoModule } from './cooperativo/cooperativo.module';

@Module({
  imports: [UsuarioModule, ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}) , MongooseModule.forRoot(process.env.DB_URI), ProyectoModule, CooperativoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
