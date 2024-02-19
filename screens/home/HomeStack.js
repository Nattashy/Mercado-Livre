import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from './Home'
import Roupas from './Roupas'
import Ferramentas from './Ferramentas'
import Casa from './Casa'
import Carros from './Carros'
import Compra from './Compra'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <>
      <Stack.Navigator>

        <Stack.Screen name="home" component={Home} options={{ title: "Home" }} />
        <Stack.Screen name="compra" component={Compra} options={{ title: "Compra" }} />
        <Stack.Screen name="roupas" component={Roupas} options={{ title: "Roupas" }} />
        <Stack.Screen name="ferramentas" component={Ferramentas} options={{ title: "Ferramentas" }} />
        <Stack.Screen name="casa" component={Casa} options={{ title: "Casa" }} />
        <Stack.Screen name="carros" component={Carros} options={{ title: "Carros" }} />
      </Stack.Navigator>

    </>
  )
}

export default HomeStack