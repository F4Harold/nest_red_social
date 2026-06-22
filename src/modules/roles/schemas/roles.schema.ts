import{
    Prop,
    Schema,
    SchemaFactory,  
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({
    timestamps: true,
})
export class Role {
    
    @Prop({
        required: true,
        unique: true,
    })
    nombre!: string;
    
    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
