import * as LocalRepository from './Local';

const DEV_HOST = 'http://192.168.15.69:9002';
let HOST = DEV_HOST;

const SERVER_RESPONSE_STATUS = 'SUCCESS';

export const changeServerAddr = serverAddr => {
    if (!serverAddr) {
        HOST = DEV_HOST;
        return;
    }
    const startsWithHTTP = serverAddr.startsWith('http');
    if (!startsWithHTTP) {
        serverAddr = `http://${serverAddr}`;
    }
    HOST = serverAddr;
};

export const register = async data => {
    const params = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: data.name, login: data.email, password: data.password }),
    }
    const result = await fetch(`${HOST}/user/userlogin`, params);
    if (result.ok) {
        const dados = await result.json();
        if (!dados.errors) {
            return dados.response;
        }
    } else {
        let error = await result.text();
        error = JSON.parse(error);
        const reason = error.response.stackTrace[0].methodName;
        return { error: reason };
    }
};

export const login = async (username, password) => {
    const data = { username, password };
    const params = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }
    const result = await fetch(`${HOST}/login`, params);
    if (result.ok) {
        const response = await result.json();
        if (!response.errors) {
            await LocalRepository.saveToken(response.response.token);
            delete response.response.token;
            await LocalRepository.saveUserData(response.response);
            return response.response;
        }
    } else {
        //TODO ver o que fazer com isso
        const error = await result.text();
        // throw new Error(erro);
    }
};
export const sendPasswordResetRequest = async username => {
    const params = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: username,
    }
    const result = await fetch(`${HOST}/forgot-password`, params);
    const data = await result.json();
    return result.ok && data.status === SERVER_RESPONSE_STATUS;
};

export const resetPassword = async (hash, password) => {
    const params = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hash, password }),
    }
    const result = await fetch(`${HOST}/password-recovery`, params);
    const data = await result.json();
    return result.ok && data.status === SERVER_RESPONSE_STATUS;
};

export const getUserData = async () => {
    const token = await LocalRepository.getToken();
    const userData = await LocalRepository.getUserData();
    const params = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            credentials: 'include',
            Authorization: token,
        },
    }
    const result = await fetch(`${HOST}/user/${userData.id}`, params);
    if (result.ok) {
        const data = await result.json();
        return data;
    } else {
        if (result.status === 401) {
            return new Error(401);
        }
        const error = await result.text();
        return new Error(error);
    }
};




////TESTES//////

import Moment from 'moment';

const DATA = [
    {
        id: '1',
        local: 'Hospital XYZ - Rua inventada',
        specialty: 'Clinico geral',
        name: 'Milton Nascimento',
        date: new Date().getTime(),
        userStatus: 'confirmed',
        hospitalStatus: 'confirmed',
    },
    {
        id: '2',
        local: 'Hospital Bahia Sul - Rua desconhecida',
        specialty: 'Cardiologista',
        name: 'Chorão do Charlie Brown',
        date: Moment(new Date()).add(1, 'day').toDate().getTime(),
        userStatus: 'confirmed',
        hospitalStatus: 'rejected',
    },
    {
        id: '3',
        local: 'Hospital leste oeste - Rua XV de Novembro',
        specialty: 'Urologista',
        name: 'Dinho Ouro Preto',
        date: Moment(new Date()).add(2, 'day').toDate().getTime(),
    },
    {
        id: '4',
        local: 'Posto de saúde da Barra - Rua da barra',
        specialty: 'Nutricionista',
        name: 'Maria Gadú',
        date: Moment(new Date()).add(3, 'day').toDate().getTime(),
    },
    {
        id: '5',
        local: 'Hospital XYZ - Rua inventada',
        specialty: 'Clinico geral',
        name: 'Cacau Menezes',
        date: Moment(new Date()).add(2, 'week').toDate().getTime(),
    },
    {
        id: '6',
        local: 'Hospital Bahia Sul - Rua desconhecida',
        specialty: 'Cardiologista',
        name: 'Mario Mota',
        date: Moment(new Date()).add(1, 'month').toDate().getTime(),
    },
    {
        id: '7',
        local: 'Hospital leste oeste - Rua XV de Novembro',
        specialty: 'Urologista',
        name: 'Sheyla Carvalho',
        date: Moment(new Date()).add(1, 'month').toDate().getTime(),
    },
    {
        id: '8',
        local: 'Posto de saúde da Barra - Rua da barra',
        specialty: 'Nutricionista',
        name: 'Cumpadi Uóshitu',
        date: Moment(new Date()).add(1, 'month').toDate().getTime(),
    },
]


export const getAppointments = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(DATA);
        }, 200);
    });
};

export const updateAppointment = data => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(DATA);
        }, 200);
    });
};

export const filterAppointment = filters => {
    return new Promise(resolve => {
        let result = [];
        if (!filters.length) {
            result = DATA;
        } else {
            const now = new Date();
            if (filters.includes('today')) {
                const data = DATA.filter(item => {
                    return Moment(new Date(item.date)).isSame(now, 'day');
                });
                result = result.concat(data);
            }
            if (filters.includes('tomorrow')) {
                const data = DATA.filter(item => {
                    const tomorrow = Moment(new Date()).add(1, 'day');
                    return Moment(new Date(item.date)).isSame(tomorrow, 'day');
                });
                result = result.concat(data);
            }
            if (filters.includes('this-week')) {
                const data = DATA.filter(item => {
                    console.log('new Date(item.date)', new Date(item.date));
                    console.log('?', Moment(new Date(item.date)).isSame(now, 'week'));
                    return Moment(new Date(item.date)).isSame(now, 'week');
                });
                result = result.concat(data);
            }
        }
        result = [...new Set(result)];
        setTimeout(() => {
            resolve(result);
        }, 200);
    });
};