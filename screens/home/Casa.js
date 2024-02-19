import React from "react"
import { View, Text, FlatList, StyleSheet, ScrollView, ImageBackground } from "react-native"
import { Button, Card, Searchbar } from "react-native-paper"
import {collection, onSnapshot} from "firebase/firestore";
import {database} from "../../service";
import Toolbar from "../../componentes/toolbar/Toolbar";
import CardTemplate from "../../componentes/card/Card";

const Casa = ({ navigation }) => {

  const [list,setList] = React.useState([])

  React.useEffect(()=>{
    const db =  collection(database, "Casa");
    const unsub = onSnapshot(db, (snap) => {
      let docs = [];
      //@ts-ignore
      snap.forEach(doc => docs.push({ ...doc.data(), id: doc.id }));

      setList(docs)
      console.log(docs)
    });

  },[])

  return (

      <ImageBackground
          source={require("../../assets/Fundo-logo.png")}
          style={{ width: '100%', height: '100%' }}
      >
        <ScrollView style={{paddingTop:"20px"}}>

          <View style={styles.header}>

            <View style={{ alignItems: 'center' }}>
              <Searchbar
                  placeholder="Pesquisar produtos"
                  placeholderTextColor='#000'
                  style={{ backgroundColor: '#ffffff', width: '95%', borderRadius: '15px',color:"red" }}
              />
            </View>
          </View>

          <Toolbar navigation={navigation}/>
          
          <FlatList
              data={list}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              renderItem={({ item }) => (

                  <CardTemplate item={item} type={"Casa"} navigation={navigation}/>

              )}
          />

        </ScrollView>
      </ImageBackground>

  )
}

export default Casa;

const styles = StyleSheet.create({
  header: {
    padding: 5
  },

  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    width: "100%"
  }

})