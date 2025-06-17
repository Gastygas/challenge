import { Test, TestingModule } from '@nestjs/testing';
import { AreaService } from './area.service';
import { AreaRepository } from './area.repository';
import { BadRequestException } from '@nestjs/common';


describe('AreaService', () => {
  let service: AreaService;
  let repository: AreaRepository;

  const mockAreaRepository = {
    getAllAreasRepository: jest.fn(),
    createNewAreaRepository: jest.fn(),
    initDefaultAreasRepository: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AreaService,
        { provide: AreaRepository, useValue: mockAreaRepository },
      ],
    }).compile();

    service = module.get<AreaService>(AreaService);
    repository = module.get<AreaRepository>(AreaRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar todas las áreas', async () => {
    const result = [
      { id: '1', name: 'Desarrollo' },
      { id: '2', name: 'Marketing' },
    ];
    mockAreaRepository.getAllAreasRepository.mockResolvedValue(result);

    const response = await service.getAllAreasService();
    expect(response).toEqual(result);
    expect(repository.getAllAreasRepository).toHaveBeenCalled();
  });

  it('debe crear una nueva área', async () => {
    const dto = { name: 'Finanzas' };
    const result = { success: 'area created', area: dto };
    mockAreaRepository.createNewAreaRepository.mockResolvedValue(result);

    const response = await service.createNewAreasService(dto);
    expect(response).toEqual(result);
    expect(repository.createNewAreaRepository).toHaveBeenCalledWith(dto);
  });

  it('debe inicializar las áreas por defecto si no existen previamente', async () => {
    const result = {
      success: 'Áreas creadas correctamente',
      areas: [
        { name: 'Administracion' },
        { name: 'Desarrollo' },
      ],
    };
    mockAreaRepository.initDefaultAreasRepository.mockResolvedValue(result);

    const response = await service.initDefaultAreasService();
    expect(response).toEqual(result);
    expect(repository.initDefaultAreasRepository).toHaveBeenCalled();
  });

  it('debe lanzar BadRequest si ya existen áreas en la inicialización', async () => {
    mockAreaRepository.initDefaultAreasRepository.mockImplementation(() => {
      throw new BadRequestException('Ya existen áreas creadas');
    });

    await expect(service.initDefaultAreasService()).rejects.toThrow(BadRequestException);
  });
});
