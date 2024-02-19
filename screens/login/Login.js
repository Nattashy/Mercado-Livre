import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text, TextInput } from 'react-native'
import logo from '../../assets/logo.png'
import { KeyboardAvoidingView } from 'react-native'
import { ImageBackground } from 'react-native';
import loginValidator from '../../validators/loginValidator'
import { Formik } from 'formik'
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../service";

const Login = ({ navigation }) => {

    const [erro, setErro] = React.useState(null)

    let login = {
        email: '',
        senha: ''
    }

    const enter = (values) => {
        console.log(values)
        signInWithEmailAndPassword(auth, values.email, values.senha).then((userCredential) => {
            const user = userCredential.user
        }).catch((error) => {
            if(error){
                setErro("Credenciais inválidas ou usuário não cadastrado")
            }
            console.log(error)
        })
    }

    return (
        <>
            <ImageBackground
                source={require('../../assets/fundo.jpeg')}
                style={styles.imagemfundo}
            >
                <KeyboardAvoidingView style={styles.fundo}>
                    <View>
                        <Image source={logo} />
                        <Text style={styles.titulo}>Bem vindo!</Text>
                    </View>

                    <Formik initialValues={login} validationSchema={loginValidator} onSubmit={enter}>
                        {({ values, handleChange, handleSubmit, errors, touched }) => (
                            <View>

                                <TextInput
                                    placeholder='Email'

                                    style={styles.input}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                />

                                {(errors.email && touched.email) &&
                                    <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{errors.email}</Text>
                                }

                                <TextInput
                                    placeholder='Senha'
                                    style={styles.input}
                                    value={values.senha}
                                    secureTextEntry={true}
                                    onChangeText={handleChange('senha')}
                                />

                                {(errors.senha && touched.senha) &&
                                    <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{errors.senha}</Text>
                                }

                                {(erro)  &&
                                    <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{erro}</Text>
                                }
                                <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                                    <Text style={styles.textoBotao}>Acessar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.botao2} onPress={() => navigation.navigate('cadastro')}>
                                    <Text style={styles.textoBotao}>Criar conta gratuita</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                    </Formik>

                </KeyboardAvoidingView>
            </ImageBackground>

        </>
    )
}

export default Login

const styles = StyleSheet.create({

    imagemfundo: {
        width: 'auto',
        height: 'auto',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    fundo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
        alignContent: 'center',
        color: '#212122'
    },

    input: {
        margin: 5,
        paddingVertical: 10,
        paddingRight: 70,
        paddingLeft: 15,
        borderRadius: 8,
        fontSize: 18,
        backgroundColor: '#dbdad9',
        width: '100%',
        color: '#000000'
    },

    botao: {
        backgroundColor: '#ee6e0b',
        width: '100%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        margin: 5
    },

    botao2: {
        backgroundColor: '#212122',
        width: '100%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        margin: 5
    },

    textoBotao: {
        color: "#FFF",
        fontSize: 18
    }
})