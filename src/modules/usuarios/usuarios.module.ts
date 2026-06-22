import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { RolesModule } from '../roles/roles.module';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';


@Module({
  imports: [
    RolesModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
