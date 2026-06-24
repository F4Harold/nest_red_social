import {
    IsNotEmpty,
    IsString,
    MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicacionDto {
    @ApiProperty({
        description: 'ID del usuario que crea la publicacion',
    })
    @IsNotEmpty()
    usuarios!: string;

    @ApiProperty({
        description: 'Contenido de la publicacion',
        maxLength: 500,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(500, { message: 'El contenido no debe exceder los 500 caracteres' })
    contenido!: string;
}
