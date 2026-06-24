import {
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PublicacionDocument = Publicacion & Document;

/**
 * coleccion de publicaciones
 */

@Schema({
    timestamps: true,
})

export class Publicacion {
    @Prop({
        required: true,
    })
    titulo!: string;

    @Prop({
        required: true,
    })
    descripcion!: string;

    @Prop({
        required: false,
    })
    contenido?: string;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    usuario_id!: Types.ObjectId;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);

PublicacionSchema.index({ usuario_id: 1 });
PublicacionSchema.index({ titulo: 1 });
