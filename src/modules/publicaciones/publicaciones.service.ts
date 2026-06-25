import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHelper } from '../../common/helpers/response.helper';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { SearchPublicacionDto } from './dto/search-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import {
  Publicacion,
  PublicacionDocument,
} from './schemas/publicacion.schema';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectModel(Publicacion.name)
    private readonly publicacionModel: Model<PublicacionDocument>,
  ) {}

  async create(dto: CreatePublicacionDto) {
    const publicacion = await this.publicacionModel.create(dto);

    return ResponseHelper.success(publicacion, 201);
  }

  async findAll(search: SearchPublicacionDto = {}) {
    const filter: any = { activo: true };

    if (search.contenido) {
      filter.contenido = {
        $regex: search.contenido,
        $options: 'i',
      };
    }

    if (search.usuarios) {
      filter.usuarios = search.usuarios;
    }

    const page = Number(search.page) || 1;
    const limit = Number(search.limit) || 10;

    const data = await this.publicacionModel
      .find(filter)
      .populate('usuarios')
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await this.publicacionModel.countDocuments(filter);

    return ResponseHelper.success({
      total,
      page,
      limit,
      data,
    });
  }

  async findOne(id: string) {
    const publicacion = await this.publicacionModel
      .findById(id)
      .populate('usuarios');

    if (!publicacion) {
      throw new NotFoundException('Publicacion no encontrada');
    }

    return ResponseHelper.success(publicacion);
  }

  async update(id: string, dto: UpdatePublicacionDto) {
    const publicacion = await this.publicacionModel.findById(id);

    if (!publicacion) {
      throw new NotFoundException('Publicacion no encontrada');
    }

    const updatedPublicacion = await this.publicacionModel.findByIdAndUpdate(
      id,
      dto,
      { new: true },
    );

    return ResponseHelper.success(updatedPublicacion);
  }

  async remove(id: string) {
    const publicacion = await this.publicacionModel.findById(id);

    if (!publicacion) {
      throw new NotFoundException('Publicacion no encontrada');
    }

    const deletedPublicacion = await this.publicacionModel.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true },
    );

    return ResponseHelper.success(deletedPublicacion);
  }

    async restore(id: string) {
        const publicacion = await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('Publicacion no encontrada');
        }

        const restoredPublicacion = await this.publicacionModel.findByIdAndUpdate(
            id,
            { activo: true },
            { new: true },
        );

        return ResponseHelper.success(restoredPublicacion);
    }

    async findInactive() {
        const publicaciones = await this.publicacionModel
            .find({ activo: false })
            .populate('usuarios');

        return ResponseHelper.success(publicaciones);
    }
}
