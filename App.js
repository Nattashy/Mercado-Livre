import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import LoginStack from './screens/login/LoginStack'
import { PaperProvider } from 'react-native-paper'
import HomeStack from './screens/home/HomeStack'
import PerfilStack from './screens/perfil/PerfilStack'
import { auth } from "./service"
import CadastroProdutoStack from "./screens/cadastro/CadastroStack"

export default function App() {

  const Tab = createMaterialBottomTabNavigator()

  const [logged, setLogged] = React.useState(false)
  
  auth.onAuthStateChanged((user) => { user ? setLogged(true) : setLogged(false) })
  console.log(auth.currentUser)

  return (
    <>
      {
        !logged ?
          <PaperProvider>
            <NavigationContainer >
              <LoginStack />
            </NavigationContainer>
          </PaperProvider>
          :
          <PaperProvider>
            <NavigationContainer>

              <Tab.Navigator headerMode={false}>

                <Tab.Screen

                  name="Home"
                  component={HomeStack}
                  options={{
                    tabBarIcon: () => (
                      <MaterialCommunityIcons name="home" size={26} />
                    ),
                  }}
                />

                <Tab.Screen
                  name="Cadastrar"
                  component={CadastroProdutoStack}
                  options={{
                    tabBarIcon: () => (
                      <MaterialCommunityIcons name="border-color" size={26} />
                    ),
                  }}
                />

                <Tab.Screen
                  name="Perfil"
                  component={PerfilStack}
                  options={{
                    tabBarIcon: () => (
                      <MaterialCommunityIcons name="account" size={26} />
                    ),
                  }}
                />

              </Tab.Navigator>
            </NavigationContainer>
          </PaperProvider>

      }
    </>

  )
}