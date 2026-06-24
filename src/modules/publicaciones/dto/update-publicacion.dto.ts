import{
    IsOptional,
    IsString,
    MinLength,
    MaxLength,
    IsBoolean,
} from 'class-validator';
import{ApiProperty} from '@nestjs/swagger';

export class UpdatePublicacionDto {
    @ApiProperty({
        description: 'Título de la publicación',
        minLength: 3,
        maxLength: 100,
        required: false,
    })
    @IsOptional()
    @IsString()
    @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
    @MaxLength(100, { message: 'El título no debe exceder los 100 caracteres' })
    titulo?: string;

    @ApiProperty({
        description: 'Descripción de la publicación',
        minLength: 5,
        maxLength: 500,
        required: false,
    })
    @IsOptional()
    @IsString()
    @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres' })
    @MaxLength(500, { message: 'La descripción no debe exceder los 500 caracteres' })
    descripcion?: string;

    @ApiProperty({
        description: 'Contenido detallado de la publicación',
        required: false,
    })
    @IsOptional()
    @IsString()
    contenido?: string;

    @ApiProperty({
        description: 'Estado de la publicación',
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    activo?: boolean;
}
