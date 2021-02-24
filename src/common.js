import { Alert, Platform } from 'react-native'

/*
const server = Platform.OS === 'ios' ?
    'http://localhost:8080' : 'http://192.168.1.11:8080';
    */
const server = "http://192.168.1.11:8080"; // -- IpV4 da máquina (cmd: ipconfig)  

function showError(err) {
    Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`)
}

function showSuccess(msg){
    Alert.alert('Sucesso!', msg);
}

export { server, showError, showSuccess }
