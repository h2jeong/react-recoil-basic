import { atom } from "recoil"
import { loginSet } from "./queries";

const defaultUserAuth = {
    isAuthenticated: false,
    user: null
}

const token = window.localStorage.getItem('token');
if (token && token !== 'undefind' && token !== '') {
    const user = JSON.parse(window.localStorage.getItem('user'))

    if (user) {
        loginSet(token, user)
        defaultUserAuth.isAuthenticated = true;
        defaultUserAuth.user = user
    }
}

export const userAuthState = atom({
    key: 'userAuthState',
    default: defaultUserAuth
})