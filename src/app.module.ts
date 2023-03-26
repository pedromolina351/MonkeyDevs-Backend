import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsuarioModule, MongooseModule.forRoot('mongodb://localhost/monkeydb')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
