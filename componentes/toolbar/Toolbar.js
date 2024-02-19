import {TouchableOpacity, View} from "react-native";
import {Avatar, Text} from "react-native-paper"
const Toolbar = ({navigation}) => {
    return (
        <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }} >

            <TouchableOpacity onPress={() => navigation.navigate("roupas")}>
                <Avatar.Icon size={55} icon="tshirt-crew-outline" style={{ margin: 10, marginTop: 18, backgroundColor: "#cccccc" }} />
                <Text style={{ textAlign: 'center', alignItems: "center", fontSize: 14, color: "gray", fontWeight: "bold" }} >
                    Roupas
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("ferramentas")}>
                <Avatar.Icon size={55} icon="tools" style={{ margin: 10, marginTop: 18, backgroundColor: "#cccccc" }} />
                <Text style={{ textAlign: 'center', alignItems: "center", fontSize: 14, color: "gray", fontWeight: "bold" }} >
                    Ferramentas
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("casa")}>
                <Avatar.Icon size={55} icon="sofa-single-outline" style={{ margin: 10, marginTop: 18, backgroundColor: "#cccccc" }} />
                <Text style={{ textAlign: 'center', alignItems: "center", fontSize: 14, color: "gray", fontWeight: "bold" }} >
                    Casa
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("carros")}>
                <Avatar.Icon size={55} icon="car-outline" style={{ margin: 10, marginTop: 18, backgroundColor: "#cccccc" }} />
                <Text style={{ textAlign: 'center', alignItems: "center", fontSize: 14, color: "gray", fontWeight: "bold" }} >
                    Carros
                </Text>
            </TouchableOpacity>

        </View>
    )
}


export default Toolbar;