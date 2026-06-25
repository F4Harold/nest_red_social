import { ApiTags } from '@nestjs/swagger';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { ComentariosService } from './comentarios.service';
import { Controller, Body, Post, Get, Param, Put, Patch, Delete, Query } from '@nestjs/common';
import { SearchComentarioDto } from './dto/search-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Controller('comentarios')
@ApiTags('Comentarios')

export class ComentariosController {
    constructor(
        private readonly comentariosService:
            ComentariosService,
    ) {}

    @Post()
    create(
        @Body()
        dto: CreateComentarioDto,
    ) {
        return this.comentariosService.create(dto);
    }

    @Get()
    findAll(
        @Query()
        search: SearchComentarioDto,
    ) {
        return this.comentariosService.findAll(search);
    }

    @Get('inactivos')
    findInactive() {
        return this.comentariosService.findInactive();
    }

    @Get(':id')
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.comentariosService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateComentarioDto,
    ) {
        return this.comentariosService.update(id, dto);
    }

    @Patch(':id')
    patch(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateComentarioDto,
    ) {
        return this.comentariosService.update(id, dto);
    }

    @Patch(':id/restaurar')
    restore(
        @Param('id')
        id: string,
    ) {
        return this.comentariosService.restore(id);
    }

    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ) {
        return this.comentariosService.remove(id);
    }
}
