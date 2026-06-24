import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReaccionDto {
    @ApiProperty({
        description: 'ID de la publicacion a reaccionar',
    })
    @IsNotEmpty()
    publicacion_id!: string;

    @ApiProperty({
        description: 'ID del usuario que reacciona',
    })
    @IsNotEmpty()
    usuario_id!: string;

    @ApiProperty({
        description: 'Tipo de reaccion (ej: LIKE, LOVE, HAHA, etc)',
    })
    @IsNotEmpty()
    @IsString()
    tipo_reaccion!: string;
}
