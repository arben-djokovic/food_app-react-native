import React, { useState } from 'react';
import { SafeAreaView, StyleSheet,TextInput,StatusBar, View, ScrollView, Dimensions } from 'react-native';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Data from './Store'
import { useDispatch } from 'react-redux';
import Item from './Item';

export default function SearchScreen({navigation}) {

    var [inputText, setInputText] = useState('')
    var dispatch = useDispatch()

  return (<SafeAreaView style={styles.androidSafe}>
      <View style={styles.header}>
        <Ionicons onPress={()=>{navigation.goBack()}} name="chevron-back-outline" size={24} style={styles.backBtn} color="black" />
        <TextInput onChangeText={(e)=>{setInputText(e)}} placeholder='Unesite ime proizvoda' style={styles.input} />
      </View>
      <ScrollView  style={styles.mainSection}>
      <View style={{ paddingVertical: 10 }}>
          {Data.map(item => {
              if(item.naslov.toLowerCase().includes(inputText.toLowerCase())){
                  return(<Item key={item.id} navigation={navigation} pizza={item} />)
              }
          })}
          </View>
      </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    androidSafe: {
    width: 100+'%',
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#fff',
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  slika: {
    height: 90,
    width: 100,
    borderRadius: 10,
    marginRight: 30
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10
  },
  naslovItem: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f7f7f7',
    marginRight: 20
  },
  priceDiv: {
    flexDirection: 'row',
    marginTop: 10 
  },
  mainSection: {
    backgroundColor: '#f3f3f3', 
    paddingHorizontal: 10, 
    maxHeight: Dimensions.get('window').height - 73 
  },
  input: {
    padding: 5, 
    margin: 5, 
    fontSize: 18, 
    borderBottomWidth: 1, 
    width: 90+'%'
  },
  header: {
    flexDirection: 'row', 
    alignItems:'center', 
    paddingHorizontal: 20
  },
  backBtn: {
    marginTop: 5, 
    marginRight: 10
  }
});