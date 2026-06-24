import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Publicacion, PublicacionDocument } from './schemas/publicacion.schema';
import { Model } from 'mongoose';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { ResponseHelper } from '../../common/helpers/response.helper';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { SearchPublicacionDto } from './dto/search-publicacion.dto';


@Injectable()
export class PublicacionesService {
    constructor(
        @InjectModel(Publicacion.name)
        private readonly publicacionModel:
         Model<PublicacionDocument>,
    ) {}

    /**
     * Metodo para la creacion de Publicacion
     */

    async create(dto: CreatePublicacionDto){
        const publicacion = await this.publicacionModel.create(dto);

        return ResponseHelper.success(publicacion, 201);
    }

    /**
     * consultar publicaciones
     */

    async findAll(search: SearchPublicacionDto = {}){
        // crear filtro
        const filter: any = { activo: true };

        // filtro por título
        if(search.titulo){
            filter.titulo = {
                $regex: search.titulo,
                $options: 'i'
            };
        }

        // filtro por usuario_id
        if(search.usuario_id){
            filter.usuario_id = search.usuario_id;
        }

        // paginacion
        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;

        // consulta
        const data = await this.publicacionModel
            .find(filter)
            .populate('usuario_id')
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        // contador de documentos = contador de publicaciones
        const total = await this.publicacionModel.countDocuments(filter);

        return ResponseHelper.success({
            total,
            page,
            limit,
            data
        });
    }

    /**
     * consulta por id de publicacion
     */

    async findOne(id: string){
        const publicacion = await this.publicacionModel
            .findById(id)
            .populate('usuario_id');

        if(!publicacion){
            throw new NotFoundException('Publicación no encontrada')
        }

        return ResponseHelper.success(publicacion)
    }

    /**
     * actualizacion de publicacion
     */

    async update(id: string, dto: UpdatePublicacionDto){
        const publicacion = await this.publicacionModel.findById(id);

        if(!publicacion){
            throw new NotFoundException('Publicación no encontrada')
        }

        const updatedPublicacion = await this.publicacionModel.findByIdAndUpdate(
            id,
            dto,
            { new: true }
        );

        return ResponseHelper.success(updatedPublicacion);
    }

    /**
     * eliminacion logica de publicacion
     */

    async remove(id: string){
        const publicacion = await this.publicacionModel.findById(id);

        if(!publicacion){
            throw new NotFoundException('Publicación no encontrada')
        }

        const deletedPublicacion = await this.publicacionModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true }
        );

        return ResponseHelper.success(deletedPublicacion);
    }

    /**
     * obtener publicaciones inactivas
     */

    async findInactive(){
        const publicaciones = await this.publicacionModel
            .find({ activo: false })
            .populate('usuario_id')
            .sort({ createdAt: -1 });

        return ResponseHelper.success(publicaciones);
    }
}
