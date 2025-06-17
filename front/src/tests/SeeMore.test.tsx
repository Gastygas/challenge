// SeeMore.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import SeeMore from '../components/SeeMore';

describe('SeeMore component', () => {
  const worker = {
    id: '1',
    name: 'Juan',
    last_name: 'Perez',
    dni: '12345678',
    birthdate: '1990-01-01',
    about: 'Developer',
    area: { id: 'area-1', name: 'Desarrollo' },
    status: true,
  };

  const mockHandlers = {
    setIsOpenEdit: vi.fn(),
    handleDisableOrEnable: vi.fn(),
    handleConfirm: vi.fn(),
    handleChange: vi.fn(),
    handleDelete: vi.fn(),
    setEditMode: vi.fn(),
    setFormData: vi.fn(),
  };

  it('debe mostrar los datos del trabajador', () => {
    render(
      <SeeMore
        editMode={false}
        formData={worker}
        selectedWorker={worker}
        areas={[{ id: 'area-1', name: 'Desarrollo' }]}
        {...mockHandlers}
      />
    );

    expect(screen.getByText('Juan')).toBeInTheDocument();
    expect(screen.getByText('Perez')).toBeInTheDocument();
    expect(screen.getByText('12345678')).toBeInTheDocument();
    expect(screen.getByText('Activo')).toBeInTheDocument();
    expect(screen.getByText('Editar')).toBeInTheDocument();
  });

  it('debe activar modo edición al hacer click en "Editar"', () => {
    render(
      <SeeMore
        editMode={false}
        formData={worker}
        selectedWorker={worker}
        areas={[{ id: 'area-1', name: 'Desarrollo' }]}
        {...mockHandlers}
      />
    );

    fireEvent.click(screen.getByText('Editar'));
    expect(mockHandlers.setEditMode).toHaveBeenCalledWith(true);
  });

  it('debe llamar a handleDisableOrEnable al hacer click en "Dar baja"', () => {
    render(
      <SeeMore
        editMode={false}
        formData={worker}
        selectedWorker={worker}
        areas={[{ id: 'area-1', name: 'Desarrollo' }]}
        {...mockHandlers}
      />
    );

    fireEvent.click(screen.getByText('Dar baja'));
    expect(mockHandlers.handleDisableOrEnable).toHaveBeenCalled();
  });
});