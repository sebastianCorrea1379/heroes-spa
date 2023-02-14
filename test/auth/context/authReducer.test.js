import { authReducer, types } from "../../../src/auth";


describe('Pruebas en authReducer.js', () => {
    
    const initialState = {
        logged: false,
    }

    test('Debe retornar el estado por defecto', () => {

        const newState = authReducer(initialState, {});

        expect(newState).toBe(initialState);
        
    });

    test('Debe (login) llamar el login autenticar y establecer el user', () => { 

        const action = {
            type: types.login,
            payload: {
                id: '123',
                user: 'juan',
            }
        };

        const newState = authReducer(initialState, action);

        expect(newState).toEqual({
            logged: true,
            user: action.payload,
        });
        
    });

    test('Debe (logout) borrar el name del usuario y logged en false', () => {

        const state = {
            logged: true,
            user: {
                id: '123',
                user: 'Juan',
            }
        };

        const action = {
            type: types.logout,
        };

        const newState = authReducer(state, action);

        expect(newState).toEqual({
            logged: false,
        });

    });

 });