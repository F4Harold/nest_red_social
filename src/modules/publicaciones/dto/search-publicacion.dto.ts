import{
    IsOptional,
    IsString,
    IsNumber,
} from 'class-validator';
import{ApiProperty} from '@nestjs/swagger';

export class SearchPublicacionDto {
    @ApiProperty({
        description: 'Buscar por título',
        required: false,
    })
    @IsOptional()
    @IsString()
    titulo?: string;

    @ApiProperty({
        description: 'Número de página',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    page?: number;

    @ApiProperty({
        description: 'Límite de registros por página',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    limit?: number;

    @ApiProperty({
        description: 'Filtrar por usuario_id',
        required: false,
    })
    @IsOptional()
    @IsString()
    usuario_id?: string;
}
