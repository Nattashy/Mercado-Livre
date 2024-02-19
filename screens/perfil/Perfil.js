import React, { useState } from "react"
import { ImageBackground, ScrollView, TouchableOpacity, View } from "react-native"
import { Avatar, Card, Divider, IconButton, Text } from "react-native-paper"
import { signOut } from "firebase/auth";
import { auth, database } from "../../service";
import { collection, onSnapshot, query, where } from "firebase/firestore";


const Perfil = ({ navigation }) => {

    const [expandedCard, setExpandedCard] = useState(null)
    const [user, setUser] = useState(null)

    const handleCardPress = (cardTitle) => {
        setExpandedCard(expandedCard === cardTitle ? null : cardTitle)
    }

    const renderCardContent = (title, subtitle, iconName) => (

        <View>
            <Card.Title
                title={title}
                subtitle={subtitle}
                left={(props) => (
                    <Avatar.Icon {...props} style={{ backgroundColor: "#ee6e0b" }} size={40} icon={iconName} color="white" />
                )}
                right={(props) => (
                    <IconButton {...props} icon={expandedCard === title ? "chevron-up" : "chevron-down"} onPress={() => handleCardPress(title)} />
                )}
                titleStyle={{ fontSize: 17, marginLeft: 5, textAlign: "left", fontWeight: 'bold', color: "black" }}
                subtitleStyle={{ fontSize: 12, marginLeft: 5, textAlign: "left", color: "black" }}
            />
            {expandedCard === title && (
                <View style={{ padding: 10 }}>
                    {/* Mostrar informações adicionais quando o card estiver expandido */}
                    {title === "Dados da Conta" && (
                        <>
                            <View style={{ display: "flex", flexDirection: "row", margin: '3px' }}>
                                <Text style={{ fontWeight: "bold", fontSize: 14, color: "black" }}>Email: </Text>
                                <Text style={{ color: "black", fontSize: 15 }}>{user ? user.email : "loading..."}</Text>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", margin: '3px' }}>
                                <Text style={{ fontWeight: "bold", fontSize: 14, color: "black" }}>CPF: </Text>
                                <Text style={{ color: "black", fontSize: 15 }}>{user ? user.cpf : "loading..."}</Text>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", margin: '3px' }}>
                                <Text style={{ fontWeight: "bold", fontSize: 14, color: "black" }}>Telefone: </Text>
                                <Text style={{ color: "black", fontSize: 15 }}>{user ? user.telefone : "loading..."}</Text>
                            </View>
                        </>
                    )}
                    {title === "Segurança" && (
                        <>
                            <Text style={{ color: "black", fontSize: 15 }}>Não compartilhe sua senha.</Text>
                            <Text style={{ color: "black", fontSize: 15 }}>Não reutilize senha.</Text>
                            <Text style={{ color: "black", fontSize: 15 }}>Utilize senhas fortes utlizando letras maiúsculas, minúsculas, números e caracteres especiais.</Text>
                        </>
                    )}
                    {/* Adicione mais lógica para outros cards, se necessário */}
                </View>
            )}
        </View>
    )

    React.useEffect(() => {
        const db = collection(database, "users")
        const q = query(db, where("email", "==", auth.currentUser.email));
        const unsub = onSnapshot(q, (snap) => {
            let docs = [];
            snap.forEach(doc => docs.push({ ...doc.data(), id: doc.id }))
            console.log("Current data: ", docs[0]);
            setUser(docs[0])

        })
    }, [])
    
    return (
        <>
            <ImageBackground source={require("../../assets/Fundo-logo.png")} style={{ width: '100%', height: '100%' }}>

                <ScrollView>

                    <View style={{ marginVertical: 35 }}>
                        <Card.Title
                            title={user ? user.nome : "Loading..."}
                            subtitle={auth.currentUser.email}
                            left={(props) => (
                                <Avatar.Icon {...props} style={{ backgroundColor: "#ee6e0b" }} size={60} icon="account" color="white" />
                            )}
                            titleStyle={{ fontWeight: 'bold', textAlign: "left", marginLeft: 20, fontSize: '22px', color: "black" }}
                            subtitleStyle={{ textAlign: "left", marginLeft: 20, fontSize: '14px', color: "black" }}
                        />
                    </View>

                    <Divider />
                    {renderCardContent("Dados da Conta", "Dados sobre sua conta cadastrada", "account-check")}
                    <Divider />

                    {renderCardContent("Minhas Informações", "Informações para utilizar a conta", "card-account-details-outline")}
                    <Divider />

                    {renderCardContent("Privacidade", "Preferências de controle de uso", "shield-account-outline")}
                    <Divider />

                    {renderCardContent("Segurança", "Deixe sua conta mais segura", "lock")}
                    <Divider />

                    {renderCardContent("Cartões", "Gerencie seus cartões", "credit-card-multiple")}
                    <Divider />

                    {renderCardContent("Endereços", "Gerencie seus endereços", "map-marker")}
                    <Divider />

                    <View>
                        <TouchableOpacity onPress={() => { signOut(auth) }}>
                            <Card.Title
                                title={"Sair"}
                                subtitle={"Sentiremos sua falta"}
                                left={(props) => (
                                    <Avatar.Icon {...props} style={{ backgroundColor: "#ee6e0b" }} size={40} icon={'logout'} color="white" />
                                )}
                                titleStyle={{ fontSize: 17, marginLeft: 5, textAlign: "left", fontWeight: 'bold', color: "black" }}
                                subtitleStyle={{ fontSize: 12, marginLeft: 5, textAlign: "left", color: "black" }}

                            />
                        </TouchableOpacity>
                    </View>
                    <Divider />

                </ScrollView>
            </ImageBackground>
        </>
    )
}

export default Perfil