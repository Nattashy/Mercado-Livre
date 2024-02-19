import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Perfil from './Perfil'

const Stack = createStackNavigator()

const PerfilStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="perfil" component={Perfil} options={{ title: 'Perfil' }} />
      </Stack.Navigator>
    </>

  )
}

export default PerfilStack