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
    collection: 'publicaciones',
})

export class Publicacion {
    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    usuarios!: Types.ObjectId;

    @Prop({
        required: true,
    })
    contenido!: string;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);

PublicacionSchema.index({ usuarios: 1 });
