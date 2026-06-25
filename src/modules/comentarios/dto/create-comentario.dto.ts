import {
    IsNotEmpty,
    IsString,
    MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComentarioDto {
    @ApiProperty({
        description: 'ID de la publicacion a comentar',
    })
    @IsNotEmpty()
    publicacion_id!: string;

    @ApiProperty({
        description: 'ID del usuario que comenta',
    })
    @IsNotEmpty()
    usuario_id!: string;

    @ApiProperty({
        description: 'Texto del comentario',
        maxLength: 300,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(300, { message: 'El comentario no debe exceder los 300 caracteres' })
    comentario!: string;
}
