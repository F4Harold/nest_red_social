import {
    IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeguidorDto {
    @ApiProperty({
        description: 'ID del usuario que sigue',
    })
    @IsNotEmpty()
    seguidor_id!: string;

    @ApiProperty({
        description: 'ID del usuario que es seguido',
    })
    @IsNotEmpty()
    seguido_id!: string;
}
