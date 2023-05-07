import { Module } from '@nestjs/common';
import { CooperativoController } from './cooperativo.controller';
import { CooperativoService } from './cooperativo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CooperativoSchema } from './schemas/cooperativo.schema';
import { UserSchema } from '../usuario/schemas/usuario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ('Cooperativo'), schema: CooperativoSchema },
      { name: ('Usuario'), schema: UserSchema },
    ])
  ],
  controllers: [CooperativoController],
  providers: [CooperativoService]
})
export class CooperativoModule {}
