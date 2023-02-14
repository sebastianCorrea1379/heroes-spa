import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth/context/AuthContext';
import { Navbar } from '../../../src/ui/components/Navbar';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en Navbar.jsx', () => { 

    const contextValue = {
        logged: true,
        user: {
            id: '123',
            name: 'Sebas Correa',
        },
        logout: jest.fn(),
    }

    beforeEach(() => jest.clearAllMocks());

    test('Debe mostrar el nombre del usuario loggeado', () => { 

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Sebas Correa')).toBeTruthy();
        
    });


    test('Debe llamar el logout y navigate cuando se hace click en el boton', () => { 

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {replace: true});
        
    });
    
});