import { ApiTags } from '@nestjs/swagger';
import { CreateReaccionDto } from './dto/create-reaccion.dto';
import { ReaccionesService } from './reacciones.service';
import { Controller, Body, Post, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { SearchReaccionDto } from './dto/search-reaccion.dto';
import { UpdateReaccionDto } from './dto/update-reaccion.dto';

@Controller('reacciones')
@ApiTags('Reacciones')

export class ReaccionesController {
    constructor(
        private readonly reaccionesService:
            ReaccionesService,
    ) {}

    @Post()
    create(
        @Body()
        dto: CreateReaccionDto,
    ) {
        return this.reaccionesService.create(dto);
    }

    @Get()
    findAll(
        @Query()
        search: SearchReaccionDto,
    ) {
        return this.reaccionesService.findAll(search);
    }

    @Get(':id')
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.reaccionesService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateReaccionDto,
    ) {
        return this.reaccionesService.update(id, dto);
    }

    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ) {
        return this.reaccionesService.remove(id);
    }
}
