import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Seguidor, SeguidorDocument } from './schemas/seguidor.schema';
import { Model } from 'mongoose';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ResponseHelper } from '../../common/helpers/response.helper';
import { SearchSeguidorDto } from './dto/search-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';

@Injectable()
export class SeguidoresService {
    constructor(
        @InjectModel(Seguidor.name)
        private readonly seguidorModel:
            Model<SeguidorDocument>,
    ) {}

    /**
     * Metodo para la creacion de Seguidor
     */

    async create(dto: CreateSeguidorDto) {
        const seguidor = await this.seguidorModel.create(dto);

        return ResponseHelper.success(seguidor, 201);
    }

    /**
     * consultar seguidores
     */

    async findAll(search: SearchSeguidorDto = {}) {
        // crear filtro
        const filter: any = {
            $or: [
                { activo: true },
                { activo: { $exists: false } },
            ],
        };

        // filtro por seguidor
        if (search.seguidor_id) {
            filter.seguidor_id = search.seguidor_id;
        }

        // filtro por seguido
        if (search.seguido_id) {
            filter.seguido_id = search.seguido_id;
        }

        // paginacion
        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;

        // consulta
        const data = await this.seguidorModel.find(filter).populate('seguidor_id').populate('seguido_id').skip((page-1)*limit).limit(limit);

        // contador de documentos
        const total = await this.seguidorModel.countDocuments(filter);

        return ResponseHelper.success({
            total,
            page,
            limit,
            data,
        });
    }

    /**
     * consulta por id de seguidor
     */

    async findOne(id: string) {
        const seguidor = await this.seguidorModel.findById(id).populate('seguidor_id').populate('seguido_id');

        if (!seguidor) {
            throw new NotFoundException('Seguidor no encontrado');
        }

        return ResponseHelper.success(seguidor);
    }

    /**
     * actualizacion de seguidor
     */

    async update(id: string, dto: UpdateSeguidorDto) {
        const seguidor = await this.seguidorModel.findById(id);

        if (!seguidor) {
            throw new NotFoundException('Seguidor no encontrado');
        }

        const updateSeguidor = await this.seguidorModel.findByIdAndUpdate(id, dto, {new: true});

        return ResponseHelper.success(updateSeguidor);
    }

    /**
     * soft delete
     */

    async remove(id: string) {
        const seguidor = await this.seguidorModel.findById(id);

        if (!seguidor) {
            throw new NotFoundException('Seguidor no encontrado');
        }

        const deleteSeguidor = await this.seguidorModel.findByIdAndUpdate(id, {activo: false}, {new: true});

        return ResponseHelper.success(deleteSeguidor);
    }
}
