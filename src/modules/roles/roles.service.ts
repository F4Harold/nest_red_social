import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schemas/roles.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-roles.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { UpdateRoleDto } from './dto/update-roles.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name)
        private roleModel: 
        Model<Role>,
    ) {}

    /**
     * Metodo para crear un rol
     */
    async create(
        dto:CreateRoleDto,
    ){
        const role =
        await this.roleModel.create(dto);

        return ResponseHelper.success(
            role,
            201,
        );
    }

    /**
     * metodo para consutar roles
     */

    async findAll(){
        const roles = 
        await this.roleModel.find({activo:true});

        return ResponseHelper.success(roles);
    }


    /**
     * conculta de roles eliminados logicamente
     */
    async findInactive(){
        const roles = 
        await this.roleModel.find({activo:false});

        return ResponseHelper.success(roles);
    }





/**
 * buscar un rol por id 
 */
    async findOne(id:string){
        const role =
        await this.roleModel.findById(id);

        if (!role) {
            throw new NotFoundException('Rol No encontrado ');
        }

        return ResponseHelper.success(role);
    }

    /**
     * Put= Actualizar un rol por completo
     */
    async Update(id:string, dto:UpdateRoleDto){
        const role = await this.roleModel.findById(id);
        if (!role) {
            throw new NotFoundException('Rol No encontrado ');
        }
        const updatedRole = await this.roleModel.findByIdAndUpdate(
            id,
            dto,
            { new: true },
        );
        return ResponseHelper.success(updatedRole);
    }

    /**
     * Actualizacion parcial ( Patch)
     */

    async partialUpdate(id:string, dto:UpdateRoleDto){
        const role = await this.roleModel.findById(id);
        if (!role) {
            throw new NotFoundException('Rol No encontrado ');
        }

        const updatedRole = await this.roleModel.findByIdAndUpdate(
            id,
            {$set: dto},
            { new: true },
        );
        return ResponseHelper.success(updatedRole);
    }

    /**
     * Eliminar logica
     */

    async remove(id:string){
        const role = await this.roleModel.findById(id);
        if (!role) {
            throw new NotFoundException('Rol No encontrado ');
        }
        const deletedRole = await this.roleModel.findByIdAndUpdate(id, { activo: false ,}, { new: true });
        return ResponseHelper.success(deletedRole);
    }

    /**
     * Restauracion de rol eliminado logicamente
     */
    async restore(id:string){
        const role = await this.roleModel.findById(id);
        if (!role) {
            throw new NotFoundException('Rol No encontrado ');
        }
        const restoredRole = await this.roleModel.findByIdAndUpdate(id, { activo: true }, { new: true });
        return ResponseHelper.success(restoredRole);
    }


}
