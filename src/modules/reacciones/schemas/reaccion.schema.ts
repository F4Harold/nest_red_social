import {
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReaccionDocument = Reaccion & Document;

/**
 * coleccion de reacciones
 */

@Schema({
    timestamps: true,
    collection: 'reacciones',
})

export class Reaccion {
    @Prop({
        type: Types.ObjectId,
        ref: 'Publicacion',
        required: true,
    })
    publicacion_id!: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    usuario_id!: Types.ObjectId;

    @Prop({
        required: true,
    })
    tipo_reaccion!: string;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const ReaccionSchema = SchemaFactory.createForClass(Reaccion);

ReaccionSchema.index({ publicacion_id: 1 });
ReaccionSchema.index({ usuario_id: 1 });
