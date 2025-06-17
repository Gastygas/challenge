import { Test, TestingModule } from '@nestjs/testing';
import { WorkerService } from './worker.service';
import { WorkerRepository } from './worker.respository';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('WorkerService', () => {
  let service: WorkerService;
  let repository: WorkerRepository;

  const mockWorkerRepository = {
    getAllWorkersRepository: jest.fn(),
    getWorkerByIdRepository: jest.fn(),
    createNewWorkerRepository: jest.fn(),
    modifyWorkerRepository: jest.fn(),
    disableOrEnableWorkerRepository: jest.fn(),
    deleteWorkerRepository: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkerService,
        { provide: WorkerRepository, useValue: mockWorkerRepository },
      ],
    }).compile();

    service = module.get<WorkerService>(WorkerService);
    repository = module.get<WorkerRepository>(WorkerRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar todos los empleados', async () => {
    const result = { success: 'workers found', workers: [] };
    mockWorkerRepository.getAllWorkersRepository.mockResolvedValue(result);

    const response = await service.getAllWorkersService();
    expect(response).toEqual(result);
    expect(repository.getAllWorkersRepository).toHaveBeenCalled();
  });

  it('debe lanzar NotFound si no encuentra un empleado', async () => {
    mockWorkerRepository.getWorkerByIdRepository.mockImplementation(() => {
      throw new NotFoundException('worker not found');
    });

    await expect(service.getWorkerByIdService('fake-id')).rejects.toThrow(NotFoundException);
  });

  it('debe crear un nuevo empleado', async () => {
    const dto = {
      name: 'Juan',
      last_name: 'Perez',
      dni: '12345678',
      birthdate: '1990-01-01',
      is_developer: true,
      about: 'Developer',
      area_id: 'area-1',
    };
    const result = { success: 'worker has been created', worker: dto };
    mockWorkerRepository.createNewWorkerRepository.mockResolvedValue(result);

    const response = await service.createNewWorkerService(dto);
    expect(response).toEqual(result);
    expect(repository.createNewWorkerRepository).toHaveBeenCalledWith(dto);
  });
  it('debe modificar un empleado existente', async () => {
    const id = 'worker-id';
    const dto = {
      name: 'Modificado',
      last_name: 'Apellido',
      dni: '12345678',
      birthdate: '1990-01-01',
      is_developer: false,
      about: 'nuevo about',
      area_id: 'area-2',
    };
    const result = { success: 'worker has been modified', worker: { id, ...dto } };

    mockWorkerRepository.modifyWorkerRepository.mockResolvedValue(result);

    const response = await service.modifyWorkerService(id, dto);
    expect(response).toEqual(result);
    expect(repository.modifyWorkerRepository).toHaveBeenCalledWith(id, dto);
  });

  it('debe cambiar el estado de un empleado', async () => {
    const id = 'worker-id';
    const result = {
      success: 'worker status changed',
      worker: { id, status: false }
    };

    mockWorkerRepository.disableOrEnableWorkerRepository.mockResolvedValue(result);

    const response = await service.disableOrEnableWorkerService(id);
    expect(response).toEqual(result);
    expect(repository.disableOrEnableWorkerRepository).toHaveBeenCalledWith(id);
  });

  it('debe eliminar (borrar lógicamente) un empleado', async () => {
    const id = 'worker-id';
    const result = {
      success: 'worker is disabled',
      worker: { id, status: false }
    };

    mockWorkerRepository.deleteWorkerRepository.mockResolvedValue(result);

    const response = await service.deleteWorkerService(id);
    expect(response).toEqual(result);
    expect(repository.deleteWorkerRepository).toHaveBeenCalledWith(id);
  });

  // Test negativos

  it('debe lanzar NotFound si el empleado a modificar no existe', async () => {
    const id = 'non-existent-id';
    const dto = {
      name: 'Modificado',
      last_name: 'Apellido',
      dni: '12345678',
      birthdate: '1990-01-01',
      is_developer: false,
      about: 'nuevo about',
      area_id: 'area-2',
    };

    mockWorkerRepository.modifyWorkerRepository.mockImplementation(() => {
      throw new NotFoundException('Worker not found');
    });

    await expect(service.modifyWorkerService(id, dto)).rejects.toThrow(NotFoundException);
  });

  it('debe lanzar BadRequest si el empleado no existe al cambiar el estado', async () => {
    const id = 'non-existent-id';

    mockWorkerRepository.disableOrEnableWorkerRepository.mockImplementation(() => {
      throw new BadRequestException('worker not found');
    });

    await expect(service.disableOrEnableWorkerService(id)).rejects.toThrow(BadRequestException);
  });

  it('debe lanzar BadRequest si el empleado no existe al eliminar', async () => {
    const id = 'non-existent-id';

    mockWorkerRepository.deleteWorkerRepository.mockImplementation(() => {
      throw new BadRequestException('worker not found');
    });

    await expect(service.deleteWorkerService(id)).rejects.toThrow(BadRequestException);
  });
});