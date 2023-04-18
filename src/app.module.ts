import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsuarioModule, , MongooseModule.forRoot('mongodb+srv://user:cQrQOaOAdhjDsdth@monkeydevs.yw9g6zp.mongodb.net/test')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
