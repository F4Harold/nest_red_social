import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-roles.dto';

/** 
 * DTO para actualizar un rol, extiende de 
 * partialType CONVIERTE TODAS LAS PROPIEDADES DE
 * CreateRoleDto y hace que todas las propiedades sean opcionales
 */

export class UpdateRoleDto extends PartialType(
    CreateRoleDto,
) {}