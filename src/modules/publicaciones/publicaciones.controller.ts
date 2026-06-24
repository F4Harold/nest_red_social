import { ApiTags } from "@nestjs/swagger";
import { CreatePublicacionDto } from "./dto/create-publicacion.dto";
import { PublicacionesService } from "./publicaciones.service";
import { Controller, Body, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { UpdatePublicacionDto } from "./dto/update-publicacion.dto";

@Controller('publicaciones')
@ApiTags('Publicaciones')

export class PublicacionesController {
    constructor(
        private readonly publicacionesService: 
        PublicacionesService,
    ){}

    /**
     * crear publicacion
     */
    @Post()
    create(
        @Body() 
        dto: CreatePublicacionDto
    ){
        return this.publicacionesService.create(dto);
    }

    /**
     * CONSULTAR PUBLICACIONES
     */
    @Get()
    findAll(){
        return this.publicacionesService.findAll();
    }

    /**
     * Consultar Publicaciones Inactivas
     */
    @Get('inactivos')
    findInactive(){
        return this.publicacionesService.findInactive();
    }

    /**
     * buscar publicacion por id
     */
    @Get(':id')
    findOne(
        @Param('id') 
        id: string
    ){
        return this.publicacionesService.findOne(id);
    }

    /**
     * actualizar publicacion
     */
    @Put(':id')
    update(
        @Param('id') 
        id: string,
        @Body() 
        dto: UpdatePublicacionDto
    ){
        return this.publicacionesService.update(id, dto);
    }

    /**
     * eliminar publicacion (eliminacion logica)
     */
    @Delete(':id')
    remove(
        @Param('id') 
        id: string,
    ){
        return this.publicacionesService.remove(id);
    }
}
