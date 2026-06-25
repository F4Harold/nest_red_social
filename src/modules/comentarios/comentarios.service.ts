import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHelper } from '../../common/helpers/response.helper';
import { Comentario, ComentarioDocument } from './schemas/comentario.schema';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { SearchComentarioDto } from './dto/search-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectModel(Comentario.name)
    private readonly comentarioModel: Model<ComentarioDocument>,
  ) {}

  async create(dto: CreateComentarioDto) {
    const comentario = await this.comentarioModel.create(dto);

    return ResponseHelper.success(comentario, 201);
  }

  async findAll(search: SearchComentarioDto = {}) {
    const filter: any = { activo: true };

    if (search.contenido) {
      filter.contenido = {
        $regex: search.contenido,
        $options: 'i',
      };
    }

    if (search.usuario_id) {
      filter.usuario_id = search.usuario_id;
    }

    if (search.publicacion_id) {
      filter.publicacion_id = search.publicacion_id;
    }

    const page = Number(search.page) || 1;
    const limit = Number(search.limit) || 10;

    const data = await this.comentarioModel
      .find(filter)
      .populate('usuario_id')
      .populate('publicacion_id')
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await this.comentarioModel.countDocuments(filter);

    return ResponseHelper.success({
      total,
      page,
      limit,
      data,
    });
  }

  async findOne(id: string) {
    const comentario = await this.comentarioModel
      .findById(id)
      .populate('usuario_id')
      .populate('publicacion_id');

    if (!comentario) {
      throw new NotFoundException('Comentario no encontrado');
    }

    return ResponseHelper.success(comentario);
  }

  async update(id: string, dto: UpdateComentarioDto) {
    const comentario = await this.comentarioModel.findById(id);

    if (!comentario) {
      throw new NotFoundException('Comentario no encontrado');
    }

    const updatedComentario = await this.comentarioModel.findByIdAndUpdate(
      id,
      dto,
      { new: true },
    );

    return ResponseHelper.success(updatedComentario);
  }

  async remove(id: string) {
    const comentario = await this.comentarioModel.findById(id);

    if (!comentario) {
      throw new NotFoundException('Comentario no encontrado');
    }

    const deletedComentario = await this.comentarioModel.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true },
    );

    return ResponseHelper.success(deletedComentario);
  }

  async restore(id: string) {
    const comentario = await this.comentarioModel.findById(id);

    if (!comentario) {
      throw new NotFoundException('Comentario no encontrado');
    }

    const restoredComentario = await this.comentarioModel.findByIdAndUpdate(
      id,
      { activo: true },
      { new: true },
    );

    return ResponseHelper.success(restoredComentario);
  }

  async findInactive() {
    const comentarios = await this.comentarioModel
      .find({ activo: false })
      .populate('usuario_id')
      .populate('publicacion_id');

    return ResponseHelper.success(comentarios);
  }
}

