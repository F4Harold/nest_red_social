import { IsOptional } from 'class-validator';

export class SearchReaccionDto {
    @IsOptional()
    publicacion_id?: string;

    @IsOptional()
    usuario_id?: string;

    @IsOptional()
    tipo_reaccion?: string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}
