import { Test, TestingModule } from '@nestjs/testing';
import { PublicacionesController } from './publicaciones.controller';
import { PublicacionesService } from './publicaciones.service';

describe('PublicacionesController', () => {
  let controller: PublicacionesController;
  const publicacionesServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findInactive: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicacionesController],
      providers: [
        {
          provide: PublicacionesService,
          useValue: publicacionesServiceMock,
        },
      ],
    }).compile();

    controller = module.get<PublicacionesController>(PublicacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
