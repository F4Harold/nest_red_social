import { MongooseModule } from '@nestjs/mongoose';
import { Seguidor, SeguidorSchema } from './schemas/seguidor.schema';
import { Module } from '@nestjs/common';
import { SeguidoresController } from './seguidores.controller';
import { SeguidoresService } from './seguidores.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Seguidor.name, schema: SeguidorSchema },
        ]),
    ],
    controllers: [SeguidoresController],
    providers: [SeguidoresService],
    exports: [SeguidoresService],
})
export class SeguidoresModule {}
