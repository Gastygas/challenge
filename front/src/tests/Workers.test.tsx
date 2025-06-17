import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Workers from '../screens/workers.jsx';
import * as api from '../services/api.js';

vi.mock('../services/api');

const mockedApi = vi.mocked(api, true);

describe('Workers component', () => {
    const mockWorkers = [
        {
            id: '1',
            name: 'Juan',
            last_name: 'Perez',
            dni: '12345678',
            birthdate: '1990-01-01',
            area: { id: 'area-1', name: 'Desarrollo' },
            is_developer: true,
            status: true,
        },
    ];

    const mockAreas = [{ id: 'area-1', name: 'Desarrollo' }];

    beforeEach(() => {
        mockedApi.getAllWorkers.mockResolvedValue(mockWorkers);
        mockedApi.getAllAreas.mockResolvedValue(mockAreas);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('debe cargar y mostrar empleados', async () => {
        render(<Workers />);
        expect(api.getAllWorkers).toHaveBeenCalled();
        expect(api.getAllAreas).toHaveBeenCalled();

        await waitFor(() => {
            expect(screen.getByText('Juan')).toBeInTheDocument();
        });
    });

    it('debe filtrar por nombre', async () => {
        render(<Workers />);
        await screen.findByText('Juan');

        fireEvent.change(screen.getByPlaceholderText('Busca un empleado'), {
            target: { value: 'Pedro' },
        });

        expect(screen.queryByText('Juan')).not.toBeInTheDocument();
    });

    it('debe ordenar por nombre alfabéticamente', async () => {
        mockedApi.getAllWorkers.mockResolvedValue([
            {
                id: '1',
                name: 'Juan',
                last_name: 'Perez',
                dni: '12345678',
                birthdate: '1990-01-01',
                area: { id: 'area-1', name: 'Desarrollo' },
                is_developer: true,
                status: true,
            },
            {
                id: '2',
                name: 'Ana',
                last_name: 'Gómez',
                dni: '87654321',
                birthdate: '1985-01-01',
                area: { id: 'area-1', name: 'Desarrollo' },
                is_developer: false,
                status: true,
            },
        ]);

        render(<Workers />);

        // Esperar a que se rendericen ambos nombres
        await screen.findByText('Ana');
        await screen.findByText('Juan');

        // Click en el botón "Ordenar por"
        fireEvent.click(screen.getByText(/ordenar por/i));

        // Click en la opción "Alfabéticamente"
        fireEvent.click(screen.getByText(/alfabéticamente/i));

        await waitFor(() => {
            const nameElements = screen.getAllByTestId('employee-name');
            const names = nameElements.map(el => el.textContent?.trim());
            const sortedNames = [...names].sort();
            expect(sortedNames).toEqual(['Ana', 'Juan']);
        });
    });
});