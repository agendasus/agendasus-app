import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_TOKEN = 'token';
const KEY_USER_DATA = 'user_data';

export const saveToken = async token => {
    try {
        await AsyncStorage.setItem(KEY_TOKEN, token);
    } catch (e) {
        //TODO que erro pode vir aqui?
    }
}

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem(KEY_TOKEN);
        return token;
    } catch (e) {
        //TODO que erro pode vir aqui?
    }
}

export const saveUserData = async dados => {
    try {
        await AsyncStorage.setItem(KEY_USER_DATA, JSON.stringify(dados));
    } catch (e) {
        //TODO que erro pode vir aqui?
    }
}

export const getUserData = async () => {
    try {
        const dados = await AsyncStorage.getItem(KEY_USER_DATA);
        return JSON.parse(dados);
    } catch (e) {
        //TODO que erro pode vir aqui?
    }
}

export const deslogar = async () => {
    await saveToken('');
    await saveUserData('');
}