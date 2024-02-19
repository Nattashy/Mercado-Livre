import React from 'react'
import { ImageBackground, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import fundo from '../../assets/fundo.jpeg'
import { Formik } from 'formik'
import { doc, setDoc } from "firebase/firestore"
import { database } from "../../service"
import { RadioButton } from "react-native-paper"
import cadastroProdutoValidar from "../../validators/cadastroProdutoValidtor"
import * as uuid from "react-native-uuid/src/v4"

const CadastroProduto = ({navigation}) => {

    const [value, setValue] = React.useState('Home')

    let cadastro = {
        nome: '',
        valor: '',
        url: ''
    }

    const cadastrar = (values,action) => {
        setDoc(doc(database, value, uuid.v4()), {
            nome: values.nome,
            valor: values.valor,
            url: values.url
        }).catch((error) => { console.log(error) }).then(() => {
            action.resetForm()
            navigation.navigate("home")
        })
    }

    return (
        <>

            <ImageBackground
                source={fundo}
                style={styles.imagemfundo}
            >

                <Text style={styles.titulo}>Preencha os dados do Produto</Text>

                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                    <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>

                        <View style={{ alignItems: "center", margin: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Home</Text>
                            <RadioButton value="Home" color='#ee6e0b' />
                        </View>

                        <View style={{ alignItems: "center", margin: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Carros</Text>
                            <RadioButton value="Carros" color='#ee6e0b' />
                        </View>

                        <View style={{ alignItems: "center", margin: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Ferramentas</Text>
                            <RadioButton value="Ferramentas" color='#ee6e0b' />
                        </View>

                        <View style={{ alignItems: "center", margin: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Roupas</Text>
                            <RadioButton value="Roupas" color='#ee6e0b' />
                        </View>

                        <View style={{ alignItems: "center", margin: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Casa</Text>
                            <RadioButton value="Casa" color='#ee6e0b' />
                        </View>

                    </View>
                </RadioButton.Group>

                <Formik initialValues={cadastro} validationSchema={cadastroProdutoValidar} onSubmit={cadastrar}>
                    {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (

                        <View>

                            <TextInput
                                placeholder='Nome do Produto'
                                style={styles.input}
                                value={values.nome}
                                onChangeText={handleChange('nome')}
                            />

                            {(errors.nome && touched.nome) &&
                                <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{errors.nome}</Text>
                            }

                            <TextInput
                                placeholder='Valor'
                                value={values.valor}
                                onChangeText={handleChange('valor')}
                                style={styles.input}
                            />

                            {(errors.valor && touched.valor) &&
                                <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{errors.valor}</Text>
                            }

                            <TextInput
                                placeholder='URL foto'
                                style={styles.input}
                                value={values.url}
                                onChangeText={handleChange('url')}
                            />

                            {(errors.url && touched.url) &&
                                <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{errors.url}</Text>
                            }

                            <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                                <Text style={styles.textoBotao}>Cadastrar</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                </Formik>

            </ImageBackground>

        </>
    )
}

export default CadastroProduto

const styles = StyleSheet.create({

    imagemfundo: {
        width: 'auto',
        height: 'auto',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titulo: {
        margin: 10,
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center",
        color: '#212122'
    },

    input: {
        margin: 10,
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
        margin: 10
    },

    textoBotao: {
        color: "#FFF",
        fontSize: 18
    }
})