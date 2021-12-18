import {createAction, createReducer} from "deox";

const defaultState = JSON.parse(localStorage.getItem('auth')) ?? {
    authenticated: false,
    user: null,
    token: null
};

export const loginAction = createAction('LOGIN_ACTION', resolve => (user, token) => resolve({user, token}));
export const logoutAction = createAction('LOGOUT_ACTION');

export const authReducer = createReducer(defaultState, handle => [
    handle(loginAction, (state, action) => {
        const {user, token} = action.payload;
        const newState = {...state, authenticated: true, user, token};
        localStorage.setItem('auth', JSON.stringify(newState))
        console.log({newState});
        return newState;
    }),
    handle(logoutAction, (state) => {
        const newState = {...state, authenticated: false, user: null, token: null};
        localStorage.setItem('auth', JSON.stringify(newState));
        console.log({newState});
        return newState;
    })
]);