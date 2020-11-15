import * as LocalRepository from './Local';

const DEV_HOST = 'http://192.168.15.69:9002';
let HOST = DEV_HOST;

const SERVER_RESPONSE_STATUS = 'SUCCESS';

export default Remote = {
    changeServerAddr: serverAddr => {
        if (!serverAddr) {
            HOST = DEV_HOST;
            return;
        }
        const startsWithHTTP = serverAddr.startsWith('http');
        if (!startsWithHTTP) {
            serverAddr = `http://${serverAddr}`;
        }
        HOST = serverAddr;
    },
    register: async data => {
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
    },
    login: async (username, password) => {
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
    },
    sendPasswordResetRequest: async username => {
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
    },
    resetPassword: async (hash, password) => {
        const params = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hash, password: password }),
        }
        const result = await fetch(`${HOST}/password-recovery`, params);
        const data = await result.json();
        return result.ok && data.status === SERVER_RESPONSE_STATUS;
    },
    getUserData: async () => {
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
    },
}