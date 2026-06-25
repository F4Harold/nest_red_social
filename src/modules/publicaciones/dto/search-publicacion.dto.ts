import { IsOptional, IsString } from 'class-validator';

export class SearchPublicacionDto {
    @IsOptional()
    @IsString()
    contenido?: string;

    @IsOptional()
    usuarios?: string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}
