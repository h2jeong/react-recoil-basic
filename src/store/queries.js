import axios from 'axios';

// user 
export const register = username => {
    return axios.post('http://localhost:4000/user/register', { username })
}

export const login = username => {
    return axios.post('http://localhost:4000/user/login', { username })
}

export const loginSet = (token, user) => {
    axios.defaults.headers.common['Authentication'] = `Bearer ${token}`

    window.localStorage.setItem('token', token);
    window.localStorage.setItem('user', JSON.stringify(user))
}

export const logoutSet = () => {
    delete axios.defaults.headers.common['Authentication'];

    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user')
}

// note
export const create = text => {
    return axios.post('http://localhost:4000/note/create', { text })
}

export const list = () => {
    return axios.get('http://localhost:4000/note/list')
}