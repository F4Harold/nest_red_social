import {Controller,  Body, Post, Get, Param, Put, Patch, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-roles.dto';
import { UpdateRoleDto } from './dto/update-roles.dto';

@Controller('roles')
export class RolesController {
    constructor(
        private readonly Service: 
        RolesService,
    ){}

    /**
     * crear rol
     */

    @Post()
    create(
        @Body() 
        dto: CreateRoleDto
    ){
        return this.Service.create(
            dto
        );
    }

    /**
     * 
     *  CONSULTAR ROLES
     */

    @Get()
    findAll(){
        return this.Service.findAll();
    }

       /**
     * Consultar Roles Inactivos
     */

       @Get('inactivos')
       findInactive(){
        return this.Service.findInactive();
       }

    /**
     * buscar rol por id
     */
    @Get(':id')
    findOne(
        @Param('id')
        id: string,

    ){
        return this.Service.findOne(
            id,
        );
    }


    /**
     * actualizar rol por id
     * 
     */
    @Put(':id')
    Update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateRoleDto,
    ){
        return this.Service.Update( id, dto );
    }

    @Patch(':id')
    partialUpdate(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateRoleDto,
    ){
        return this.Service.partialUpdate( id, dto );
    }

    /**
     * restaurar rol eliinado
     */
    
    @Patch(':id/restaurar')
    restore(
        @Param('id')
        id: string,
    ){
        return this.Service.restore(id);
    }

    /**
     * Eliminacion Logica
     */

    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ){
        return this.Service.remove(id)
    }



 


}
