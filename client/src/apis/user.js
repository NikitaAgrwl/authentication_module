import axios from 'axios';

export const register = async (data) => {
    try {
        const response = await axios.post('http://localhost:5000/api/user/register', data);
        if (response.status === 201) {
            return { reply: 'Success'}
        }
    } catch (error) {
        console.log('API Error', error);
    }
}

export const login = async (data) => {
    try {
        const response = await axios.post('http://localhost:5000/api/user/login', data);
        console.log(response);

        if (response.status === 201) {
            return { reply: 'success', payload: response.data.payload}
        }
    } catch (error) {
        // console.log('API Error', error);
        if(error.response.status === 401){
            return { reply: 'Unauthorized'}
        }
    }
}

export const auth = async (data) => {
    try {
        const response = await axios.post('http://localhost:5000/api/user/auth', data);

        if (response.status === 201) {
            return { reply: 'success'}
        }
    } catch (error) {
        console.log('API Error', error);
    }
}

export const update = async (data) => {
    try {
        const response = await axios.post('http://localhost:5000/api/user/update', data);

        if (response.status === 201) {
            return { reply: 'success'}
        }
    } catch (error) {
        console.log('API Error', error);
    }
}



