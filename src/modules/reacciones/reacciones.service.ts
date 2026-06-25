import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reaccion, ReaccionDocument } from './schemas/reaccion.schema';
import { Model } from 'mongoose';
import { CreateReaccionDto } from './dto/create-reaccion.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ResponseHelper } from '../../common/helpers/response.helper';
import { SearchReaccionDto } from './dto/search-reaccion.dto';
import { UpdateReaccionDto } from './dto/update-reaccion.dto';

@Injectable()
export class ReaccionesService {
    constructor(
        @InjectModel(Reaccion.name)
        private readonly reaccionModel:
            Model<ReaccionDocument>,
    ) {}

    /**
     * Metodo para la creacion de Reaccion
     */

    async create(dto: CreateReaccionDto) {
        const reaccion = await this.reaccionModel.create(dto);

        return ResponseHelper.success(reaccion, 201);
    }

    /**
     * consultar reacciones
     */

    async findAll(search: SearchReaccionDto = {}) {
        // crear filtro
        const filter: any = {
            $or: [
                { activo: true },
                { activo: { $exists: false } },
            ],
        };

        // filtro por publicacion
        if (search.publicacion_id) {
            filter.publicacion_id = search.publicacion_id;
        }

        // filtro por usuario
        if (search.usuario_id) {
            filter.usuario_id = search.usuario_id;
        }

        // filtro por tipo de reaccion
        if (search.tipo_reaccion) {
            filter.tipo_reaccion = {
                $regex: search.tipo_reaccion,
                $options: 'i',
            };
        }

        // paginacion
        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;

        // consulta
        const data = await this.reaccionModel.find(filter).populate('publicacion_id').populate('usuario_id').skip((page-1)*limit).limit(limit);

        // contador de documentos
        const total = await this.reaccionModel.countDocuments(filter);

        return ResponseHelper.success({
            total,
            page,
            limit,
            data,
        });
    }

    /**
     * consulta por id de reaccion
     */

    async findOne(id: string) {
        const reaccion = await this.reaccionModel.findById(id).populate('publicacion_id').populate('usuario_id');

        if (!reaccion) {
            throw new NotFoundException('Reaccion no encontrada');
        }

        return ResponseHelper.success(reaccion);
    }

    /**
     * actualizacion de reaccion
     */

    async update(id: string, dto: UpdateReaccionDto) {
        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException('Reaccion no encontrada');
        }

        const updateReaccion = await this.reaccionModel.findByIdAndUpdate(id, dto, {new: true});

        return ResponseHelper.success(updateReaccion);
    }

    /**
     * soft delete
     */

    async remove(id: string) {
        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException('Reaccion no encontrada');
        }

        const deleteReaccion = await this.reaccionModel.findByIdAndUpdate(id, {activo: false}, {new: true});

        return ResponseHelper.success(deleteReaccion);
    }

    async findInactive() {
        const reacciones = await this.reaccionModel.find({ activo: false }).populate('publicacion_id').populate('usuario_id');
        return ResponseHelper.success(reacciones);
    }

    async restore(id: string) {
        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException('Reaccion no encontrada');
        }

        const restoredReaccion = await this.reaccionModel.findByIdAndUpdate(id, { activo: true }, { new: true });

        return ResponseHelper.success(restoredReaccion);
    }
}
