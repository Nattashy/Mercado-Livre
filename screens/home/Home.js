import React from "react"
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from "react-native"
import { Searchbar } from "react-native-paper"
import { collection, onSnapshot} from "firebase/firestore"
import { database } from "../../service"
import Toolbar from "../../componentes/toolbar/Toolbar"
import CardTemplate from "../../componentes/card/Card"

const Home = ({ navigation }) => {
  const [list, setList] = React.useState([])


  React.useEffect(() => {
    const db = collection(database, "Home")
    const unsub = onSnapshot(db, (snap) => {
      let docs = []
      //@ts-ignore
      snap.forEach(doc => docs.push({ ...doc.data(), id: doc.id }))

      setList(docs)
      console.log(docs)
    })

  }, [])

  return (
    <ImageBackground
      source={require("../../assets/Fundo-logo.png")}
      style={{ width: '100%', height: '100%' }}
    >
      <ScrollView style={{ paddingTop: "20px" }}>

        <View style={styles.header}>

          <View style={{ alignItems: 'center' }}>
            <Searchbar
              placeholder="Pesquisar produtos"
              placeholderTextColor='#000'
              style={{ backgroundColor: '#ffffff', width: '95%', borderRadius: '15px', color: "red" }}
            />
          </View>

        </View>

        <Toolbar navigation={navigation} />

        <FlatList
          data={list}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (

            <View style={{ alignItems: "center", width: "50%" }}>
              <CardTemplate item={item} type={"Home"} navigation={navigation}/>
            </View>
          )}
        />

      </ScrollView>
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
  header: {
    // backgroundColor: "#ee6e0b",
    padding: 5
  },

  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    width: "100%"
  }

})