import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Login from './Login'
import Cadastro from './Cadastro'

const Stack = createNativeStackNavigator()

const LoginStack = () => {
  return (
    <>
       <Stack.Navigator>
        <Stack.Screen name="login" component={Login} options={{ title: "Login" }} />
        <Stack.Screen name="cadastro" component={Cadastro} options={{ title: "Cadastro" }} />
      </Stack.Navigator>

    </>
  )
}

export default LoginStack