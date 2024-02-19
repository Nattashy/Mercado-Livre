import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CadastroProduto from "./Cadastro";

const Stack = createStackNavigator()

const CadastroProdutoStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="Produto" component={CadastroProduto} options={{ title: 'Cadastro Produto' }} />
            </Stack.Navigator>
        </>

    )
}

export default CadastroProdutoStack