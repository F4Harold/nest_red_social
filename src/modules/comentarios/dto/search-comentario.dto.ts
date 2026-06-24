import { IsOptional, IsString } from 'class-validator';

export class SearchComentarioDto {
    @IsOptional()
    @IsString()
    contenido?: string;

    @IsOptional()
    publicacion_id?: string;

    @IsOptional()
    usuario_id?: string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}
