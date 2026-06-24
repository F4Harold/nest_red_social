import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PublicacionesService } from './publicaciones.service';
import { Publicacion } from './schemas/publicacion.schema';

describe('PublicacionesService', () => {
  let service: PublicacionesService;
  const publicacionModelMock = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    countDocuments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublicacionesService,
        {
          provide: getModelToken(Publicacion.name),
          useValue: publicacionModelMock,
        },
      ],
    }).compile();

    service = module.get<PublicacionesService>(PublicacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
