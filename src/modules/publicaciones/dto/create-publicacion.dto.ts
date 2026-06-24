import{
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsOptional
} from 'class-validator';
import{ApiProperty} from '@nestjs/swagger';

export class CreatePublicacionDto {
    @ApiProperty({
        description: 'Título de la publicación',
        minLength: 3,
        maxLength: 100,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
    @MaxLength(100, { message: 'El título no debe exceder los 100 caracteres' })
    titulo!: string;

    @ApiProperty({
        description: 'Descripción de la publicación',
        minLength: 5,
        maxLength: 500,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres' })
    @MaxLength(500, { message: 'La descripción no debe exceder los 500 caracteres' })
    descripcion!: string;

    @ApiProperty({
        description: 'Contenido detallado de la publicación',
        required: false,
    })
    @IsOptional()
    @IsString()
    contenido?: string;

    @ApiProperty({
        description: 'ID del usuario que crea la publicación',
    })
    @IsNotEmpty()
    usuario_id!: string;
}
