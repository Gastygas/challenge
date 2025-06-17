import { render, screen, fireEvent } from '@testing-library/react';
import { EmployeeList } from "../components/EmployeeList.jsx"

describe('EmployeeList component', () => {
  const mockEmployees = [
    {
      id: '1',
      name: 'Juan',
      last_name: 'Perez',
      dni: '12345678',
      birthdate: '1990-01-01',
      area: { name: 'Desarrollo' },
      is_developer: true,
      status: true,
    },
  ];

  const onEditMock = vi.fn();

  it('debe renderizar correctamente', () => {
    render(<EmployeeList employees={mockEmployees} onEdit={onEditMock} />);

    expect(screen.getByText('Juan')).toBeInTheDocument();
    expect(screen.getByText('Perez')).toBeInTheDocument();
    expect(screen.getByText('12345678')).toBeInTheDocument();
    expect(screen.getByText('✅')).toBeInTheDocument();
    expect(screen.getByText('Activo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ver más/i })).toBeInTheDocument();
  });

  it('debe llamar a onEdit cuando se hace click en "Ver más"', () => {
    render(<EmployeeList employees={mockEmployees} onEdit={onEditMock} />);
    fireEvent.click(screen.getByText(/ver más/i));
    expect(onEditMock).toHaveBeenCalledWith(mockEmployees[0]);
  });
});