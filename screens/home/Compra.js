import { Formik } from 'formik'
import React from 'react'
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Card, RadioButton} from 'react-native-paper'
import { mask } from 'remask'
import {deleteDoc, doc} from "firebase/firestore"
import {database} from "../../service"
import compraValidator from "../../validators/compraValidator"

const Compra = ({navigation, route}) => {

    const [checked, setChecked] = React.useState('credito')
    const { item, type } = route.params

    let compra = {
        cep: '',
        numero: '',
        logradouro: '',
        bairro: '',
        localidade: ''
    }

    const enviar = async (values, actions) => {
        await deleteDoc(doc(database, type, item.id))
        actions.resetForm()
        navigation.navigate('home')
    }

    const carregaEndereco = async (cep, setValues) => {
        // Setando estado inical do objeto
        let compra = {
            cep: cep,
            numero: '',
            logradouro: '',
            bairro: '',
            localidade: ''
        }

        await fetch("https://viacep.com.br/ws/" + cep.replace('-','') + "/json/")
            .then((response) => response.json())
            .then((data) => {
                //Retorno da API DE CEP
                compra.logradouro = data.logradouro
                compra.bairro = data.bairro
                compra.localidade = data.localidade

                //Settando os valores no formik
                setValues(compra)
            })
    }

    return (
        <>
            <ImageBackground
                source={require("../../assets/Fundo-logo.png")}
                style={{ width: '100%', height: '100%' }}
            >
                <ScrollView>
                    <Text style={styles.titulo}>Você está comprando:</Text>

                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Card style={{ marginTop: 20, justifyContent: "center", backgroundColor: '#fff' }}>

                            <Card.Cover source={{ uri: item.url }} style={{width:"170px", height:"170px", margin:'5px'}}/>

                            <Card.Content>
                                <Text style={{ fontWeight: "bold", marginTop: 5, fontSize: 18 }}>{item.nome}</Text>

                                <View style={{display:"flex", flexDirection:"row", alignItems:"center", marginBottom: 10}}>
                                    <Text style={{  fontWeight: "bold",  fontSize: 15 }}>R$</Text>
                                    <Text style={{  fontSize: 15 }}> {item ? Number(item.valor).toFixed(2) : ''}</Text>
                                </View>
                            </Card.Content>
                        </Card>
                    </View>

                    <View style={{ margin: 30, alignItems: 'center' }}>
                        <Text style={styles.titulo}>Preencha os dados da compra</Text>

                        <Formik initialValues={compra} onSubmit={enviar}  validationSchema={compraValidator} >
                            {({ values, handleChange, handleSubmit, errors, touched, setFieldValue,setValues }) => (

                                <>
                                    <TextInput
                                        placeholder='CEP'
                                        style={styles.input}
                                        value={values.cep}
                                        onChangeText={(value) => {
                                            setFieldValue('cep', mask(value, '99999-999'))
                                            if(value.length >= 9){
                                                carregaEndereco(value, setValues)
                                            }
                                        }}
                                    />

                                    {(errors.cep && touched.cep) &&
                                        <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{errors.cep}</Text>
                                    }

                                    <TextInput
                                        placeholder='Logradouro'
                                        value={values.logradouro}
                                        onChangeText={handleChange('logradouro')}
                                        style={styles.input}
                                    />
                                    {(errors.logradouro && touched.logradouro) &&
                                        <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{errors.logradouro}</Text>
                                    }
                                    <TextInput
                                        placeholder='Bairro'
                                        value={values.bairro}
                                        onChangeText={handleChange('bairro')}
                                        style={styles.input}
                                    />
                                    {(errors.bairro && touched.bairro) &&
                                        <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{errors.bairro}</Text>
                                    }
                                    <TextInput
                                        placeholder='Localidade'
                                        value={values.localidade}
                                        onChangeText={handleChange('localidade')}
                                        style={styles.input}
                                    />
                                    {(errors.localidade && touched.localidade) &&
                                        <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{errors.localidade}</Text>
                                    }

                                    <TextInput
                                        placeholder='Número'
                                        value={values.numero}
                                        onChangeText={(value) => { setFieldValue('numero', mask(value, '9999')) }}
                                        style={styles.input}

                                    />

                                    {(errors.numero && touched.numero) &&
                                        <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{errors.numero}</Text>
                                    }

                                    <Text style={styles.titulo}>Forma de pagamento</Text>

                                    <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>

                                        <View style={{ alignItems: "center", margin: 10 }}>
                                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Crédito</Text>
                                            <RadioButton
                                                value="credito"
                                                status={checked === 'credito' ? 'checked' : 'unchecked'}
                                                onPress={() => setChecked('credito')}
                                                color='#ee6e0b'
                                            />
                                        </View>

                                        <View style={{ alignItems: "center", margin: 10 }}>
                                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Débito</Text>
                                            <RadioButton
                                                value="debito"
                                                status={checked === 'debito' ? 'checked' : 'unchecked'}
                                                onPress={() => setChecked('debito')}
                                                color='#ee6e0b'
                                            />
                                        </View>

                                        <View style={{ alignItems: "center", margin: 10 }}>
                                            <Text style={{ fontSize: 16, fontWeight: '500' }}>PIX</Text>
                                            <RadioButton
                                                value="pix"
                                                status={checked === 'pix' ? 'checked' : 'unchecked'}
                                                onPress={() => setChecked('pix')}
                                                color='#ee6e0b'
                                            />
                                        </View>

                                        <View style={{ alignItems: "center", margin: 10 }}>
                                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Boleto</Text>
                                            <RadioButton
                                                value="boleto"
                                                status={checked === 'boleto' ? 'checked' : 'unchecked'}
                                                onPress={() => setChecked('boleto')}
                                                color='#ee6e0b'
                                            />
                                        </View>

                                    </View>

                                    <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                                        <Text style={styles.textoBotao}>Finalizar compra</Text>
                                    </TouchableOpacity>

                                </>

                            )}

                        </Formik>
                    </View>

                </ScrollView>
            </ImageBackground>
        </>
    )
}

export default Compra

const styles = StyleSheet.create({

    titulo: {
        margin: 5,
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
        color: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },

    botao: {
        backgroundColor: '#ee6e0b',
        width: '80%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        margin: 10
    },

    textoBotao: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: '500'
    }
})