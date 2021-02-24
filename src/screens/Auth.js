import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native'
import axios from 'axios'
import { server, showError, showSuccess } from '../common'
import AuthInput from '../components/AuthInput'
import commonStyles from '../commonStyles'
import backgroundImage from '../../assets/imgs/login.jpg'
import { TextInput } from 'react-native-gesture-handler'

/*
    Esta tela será usada para cadastrar e logar o usuário
*/

const initialState = {
    stageNew: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export default class Auth extends Component {

    /*
    stageNew -> para saber se a tela será de cadastro (true) ou apenas de login (false),
    name -> nome do usuário
    email -> email do usuário
    password -> senha do usuário
    confirmPassword -> senha do usuário (quando stageNew for true)
    */

    state = {
        ...initialState
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            });

            // -- Faz com que em todas as próximas requisições, a tag Authorization
            // -- já seja settada por parâmetro.
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`;
            AsyncStorage.setItem('userData', JSON.stringify(res.data));
            this.props.navigation.navigate('Home', res.data);
        } catch (err) {
            //Alert.alert('Erro', 'Falha no Login!')
            showError(err);
        }
    }

    // -- Cadastrar um novo usuário
    signup = async () => {
        try {
            //const rota = `${server}/signup`;
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })

            showSuccess('Usuário cadastrado');
            this.setState({
                stageNew: false,
                name: '',
                password: '',
                confirmPassword: ''
            });
        } catch (err) {
            showError(err);
        }
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
            //Alert.alert('Sucesso!', 'Criar conta');
            this.signup();
        } else {
            //Alert.alert('Sucesso!', 'Logar');
            this.signin();
        }
    }

    /*
    render() {
        const validations = []

        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim())
            validations.push(this.state.confirmPassword)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        const validForm = validations.reduce((all, v) => all && v)

        return (
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ?
                            'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew &&
                        <AuthInput icon='user' placeholder='Nome'
                            style={styles.input}
                            value={this.state.name}
                            onChangeText={name =>
                                this.setState({ name })} />}
                    <AuthInput icon='at' placeholder='E-mail'
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={email =>
                            this.setState({ email })} />
                    <AuthInput icon='lock' secureTextEntry={true}
                        placeholder='Senha'
                        style={styles.input}
                        value={this.state.password}
                        onChangeText={password =>
                            this.setState({ password })} />
                    {this.state.stageNew &&
                        <AuthInput icon='asterisk'
                            secureTextEntry={true} placeholder='Confirmação'
                            style={styles.input}
                            value={this.state.confirmPassword}
                            onChangeText={confirmPassword =>
                                this.setState({ confirmPassword })} />}
                    <TouchableOpacity disabled={!validForm}
                        onPress={this.signinOrSignup}>
                        <View style={[styles.button, !validForm ? { backgroundColor: '#AAA' } : {}]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }}
                    onPress={() => this.setState({
                        stageNew: !this.state.stageNew
                    })}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta?'
                            : 'Ainda não possui conta?'}</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
    */

    render() {

        const validations = []

        // -- Validação de email. O email tem que conter o '@'
        validations.push(this.state.email && this.state.email.includes('@'))
        // -- Validação de password. O password tem que ter mais que 5 caracteres
        validations.push(this.state.password && this.state.password.length >= 6)

        // -- Se está na tela de cadastro de novo usuário
        if (this.state.stageNew) {
            // -- Nome deve ser todo junto deve ter mais q 3 letras
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            // -- confirmPassword é obrigatório
            validations.push(this.state.confirmPassword)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        // -- Usa o reduce conferindo se todos os valores são verdadeiros
        // -- Todos os resultados do reduce devem ser verdadeiros 
        const validForm = validations.reduce((all, v) => all && v)

        return (

            <ImageBackground source={backgroundImage}
                style={styles.background}>

                <Text style={styles.title}>Tasks</Text>

                <View style={styles.formContainer}>

                    <Text style={styles.subtitle}>
                        {this.state.stageNew ?
                            'Crie a sua conta' : 'Informe seus dados'}
                    </Text>

                    {this.state.stageNew &&
                        <AuthInput
                            icon='user'
                            placeholder='Nome'
                            style={styles.input}
                            value={this.state.name}
                            onChangeText={name =>
                                this.setState({ name })} />}

                    {/*this.state.stageNew ?
                        <TextInput placeholder='Nome'
                            style={styles.input}
                            value={this.state.name}
                            onChangeText={name =>
                            this.setState({ name })} /> : false*/}

                    <AuthInput
                        icon='at'
                        placeholder='E-mail'
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={email =>
                            this.setState({ email })} />

                    <AuthInput
                        icon='lock'
                        secureTextEntry={true}
                        placeholder='Senha'
                        style={styles.input}
                        value={this.state.password}
                        onChangeText={password =>
                            this.setState({ password })} />

                    {this.state.stageNew &&
                        <AuthInput
                            icon='asterisk'
                            secureTextEntry={true} placeholder='Confirmação'
                            style={styles.input}
                            value={this.state.confirmPassword}
                            onChangeText={confirmPassword =>
                                this.setState({ confirmPassword })} />}

                    {/*this.state.stageNew ?
                        <TextInput icon='asterisk'
                            secureTextEntry={true} placeholder='Confirmação'
                            style={styles.input}
                            value={this.state.confirmPassword}
                            onChangeText={confirmPassword =>
                            this.setState({ confirmPassword })} /> : false*/}


                    <TouchableOpacity
                        onPress={this.signinOrSignup}
                        disabled={!validForm}>

                        <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}</Text>
                        </View>

                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={{ padding: 10 }}
                    onPress={() => this.setState({
                        stageNew: !this.state.stageNew
                    })}>

                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta?'
                            : 'Ainda não possui conta?'}</Text>

                </TouchableOpacity>

            </ImageBackground>

        );

    }

}

const styles = StyleSheet.create({
    background: {
        flex: 1, // -- Permite aumentar
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        //fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 70,
        marginBottom: 10,
    },
    subtitle: {
        //fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%',
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 9
    },
    buttonText: {
        //fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
})