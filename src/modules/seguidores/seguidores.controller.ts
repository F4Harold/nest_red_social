import { ApiTags } from '@nestjs/swagger';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { SeguidoresService } from './seguidores.service';
import { Controller, Body, Post, Get, Param, Put, Patch, Delete, Query } from '@nestjs/common';
import { SearchSeguidorDto } from './dto/search-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';

@Controller('seguidores')
@ApiTags('Seguidores')

export class SeguidoresController {
    constructor(
        private readonly seguidoresService:
            SeguidoresService,
    ) {}

    @Post()
    create(
        @Body()
        dto: CreateSeguidorDto,
    ) {
        return this.seguidoresService.create(dto);
    }

    @Get()
    findAll(
        @Query()
        search: SearchSeguidorDto,
    ) {
        return this.seguidoresService.findAll(search);
    }

    @Get(':id')
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.seguidoresService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateSeguidorDto,
    ) {
        return this.seguidoresService.update(id, dto);
    }

    @Patch(':id')
    patch(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateSeguidorDto,
    ) {
        return this.seguidoresService.update(id, dto);
    }

    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ) {
        return this.seguidoresService.remove(id);
    }
}
