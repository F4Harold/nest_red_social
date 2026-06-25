import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsuariosService } from "./usuarios.service";
import {Controller,  Body, Post, Get, Param, Put, Patch, Delete, Query } from '@nestjs/common';
import { SearchUserDto } from "./dto/search-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('usuarios')
@ApiTags('Usuarios')

export class UsuariosController {
    constructor(
        private readonly usuariosService: 
        UsuariosService,
    ){}

    @Post()
    create(
        @Body() 
        dto: CreateUserDto
    ){
        return this.usuariosService.create(dto);
    }

    @Get()
    findAll(
        @Query() 
        search: SearchUserDto
    ){
        return this.usuariosService.findAll(search);
    }

    @Get('inactivos')
    findInactive(){
        return this.usuariosService.findInactive();
    }

    @Get(':id')
    findOne(
        @Param('id') 
        id:string
    ){
        return this.usuariosService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id') 
        id:string,
        @Body() 
        dto: UpdateUserDto
    ){
        return this.usuariosService.update(id, dto);
    }

    @Patch(':id')
    patch(
        @Param('id')
        id:string,
        @Body()
        dto: UpdateUserDto,
    ){
        return this.usuariosService.update(id, dto);
    }

    @Patch(':id/restaurar')
    restore(
        @Param('id')
        id:string,
    ){
        return this.usuariosService.restore(id);
    }

    @Delete(':id')
    remove(
        @Param('id') 
        id:string,
    ){
        return this.usuariosService.remove(id);
    }

}