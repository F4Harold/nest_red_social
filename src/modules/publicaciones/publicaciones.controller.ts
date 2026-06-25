import { ApiTags } from '@nestjs/swagger';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { PublicacionesService } from './publicaciones.service';
import { Controller, Body, Post, Get, Param, Put, Patch, Delete, Query } from '@nestjs/common';
import { SearchPublicacionDto } from './dto/search-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';

@Controller('publicaciones')
@ApiTags('Publicaciones')

export class PublicacionesController {
    constructor(
        private readonly publicacionesService:
            PublicacionesService,
    ) {}

    @Post()
    create(
        @Body()
        dto: CreatePublicacionDto,
    ) {
        return this.publicacionesService.create(dto);
    }

    @Get()
    findAll(
        @Query()
        search: SearchPublicacionDto,
    ) {
        return this.publicacionesService.findAll(search);
    }

    @Get('inactivos')
    findInactive() {
        return this.publicacionesService.findInactive();
    }

    @Get(':id')
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.publicacionesService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id')
        id: string,
        @Body()
        dto: UpdatePublicacionDto,
    ) {
        return this.publicacionesService.update(id, dto);
    }

    @Patch(':id')
    patch(
        @Param('id')
        id: string,
        @Body()
        dto: UpdatePublicacionDto,
    ) {
        return this.publicacionesService.update(id, dto);
    }

    @Patch(':id/restaurar')
    restore(
        @Param('id')
        id: string,
    ) {
        return this.publicacionesService.restore(id);
    }

    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ) {
        return this.publicacionesService.remove(id);
    }
}
