import {Text, TouchableOpacity, View} from "react-native"
import {deleteDoc, doc} from "firebase/firestore"
import {auth, database} from "../../service"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {Button, Card} from "react-native-paper"
import React from "react"

const CardTemplate = ({item, type, navigation}) => {

        return (
            <View style={{alignItems:"center", width:"50%"}}>
                <Card style={{marginTop: 20, justifyContent: "center", backgroundColor:'#fff', margin: 10 }}>

                    <Card.Cover source={{ uri: item.url }} style={{width:"170px", height:"170px", margin:'5px'}}/>

                    <Card.Content>
                        <Text style={{ fontWeight: "bold", marginTop: 5, fontSize: 18 }}>{item.nome}</Text>

                        <View style={{display:"flex", flexDirection:"row", alignItems:"center", margin: 10}}>
                            
                            <Text style={{  fontWeight: "bold",  fontSize: 15 }}>R$</Text>
                            <Text style={{  fontSize: 15 }}> {item ? Number(item.valor).toFixed(2) : ''}</Text>

                            <TouchableOpacity onPress={()=>{deleteDoc(doc(database, type, item.id));}}>
                                <MaterialCommunityIcons name="trash-can" size={20} style={{marginLeft:10}} color="red" />
                            </TouchableOpacity>
                        </View>

                        <Button
                            icon="cart"
                            mode="contained"
                            buttonColor="#FF882EFF"
                            textColor="#fff"
                            style={{ alignItems: "center"}}
                            onPress={() => {
                                navigation.navigate("compra", {item:item, type:type})
                            }}
                        >Comprar
                        </Button>

                    </Card.Content>

                </Card>
            </View>
        )
}

export default CardTemplate