import React from 'react'
import { ImageBackground, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import fundo from '../../assets/fundo.jpeg'
import { mask } from 'remask'
import { Formik } from 'formik'
import cadastroValidator from '../../validators/cadastroValidator'
import { doc, setDoc } from "firebase/firestore"
import {  createUserWithEmailAndPassword } from "firebase/auth"
import {auth, database} from "../../service"


const Cadastro = () => {

  let cadastro = {
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    senha: ''
  }

    const cadastrar = (values) => {
        createUserWithEmailAndPassword(auth,values.email, values.senha).then((userCredential) => {
           setDoc(doc(database, "users", values.cpf), {
            email: values.email,
            nome: values.nome,
            cpf: values.cpf,
            telefone: values.telefone,
            senha: values.senha
          }).catch((error) => {console.log(error)}).then(() => {

           })
        }).catch((error) => {console.log(error)})

    }

  return (
    <>

      <ImageBackground
        source={fundo}
        style={styles.imagemfundo}
      >

        <Text style={styles.titulo}>Preencha seus dados</Text>

        <Formik initialValues={cadastro} validationSchema={cadastroValidator} onSubmit={cadastrar}>
          {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (

            <View>

              <TextInput
                placeholder='Nome'
                style={styles.input}
                value={values.nome}
                onChangeText={handleChange('nome')}
              />

              {(errors.nome && touched.nome) &&
                <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{errors.nome}</Text>
              }

              <TextInput
                placeholder='Email'
                value={values.email}
                onChangeText={handleChange('email')}
                style={styles.input}
              />

              {(errors.email && touched.email) &&
                <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{errors.email}</Text>
              }

              <TextInput
                placeholder='CPF'
                style={styles.input}
                value={values.cpf}
                onChangeText={(value) => { setFieldValue('cpf', mask(value, '999.999.999-99')) }}
              />

              {(errors.cpf && touched.cpf) &&
                <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{errors.cpf}</Text>
              }

              <TextInput
                placeholder='Telefone'
                style={styles.input}
                value={values.telefone}
                onChangeText={(value) => { setFieldValue('telefone', mask(value, '(99) 99999-9999')) }}
              />

              {(errors.telefone && touched.telefone) &&
                <Text style={{ color: 'red', marginTop: 2, margin: 10 }}>{errors.telefone}</Text>
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

              <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                <Text style={styles.textoBotao}>Criar conta</Text>
              </TouchableOpacity>

            </View>

          )}

        </Formik>

      </ImageBackground>

    </>
  )
}

export default Cadastro

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