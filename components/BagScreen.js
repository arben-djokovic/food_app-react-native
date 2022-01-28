import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, TouchableOpacity, ScrollView, View,Image, Dimensions } from 'react-native';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { cardAddAction } from '../redux/Actions';
import Footer from './Footer';
import Data from './Store'
import { cardRemoveAction, itemAction } from './../redux/Actions';
import { Ionicons, Fontisto } from '@expo/vector-icons';

export default function BagScreen({navigation}) {

  var dispatch = useDispatch()
  var card = useSelector(store => store.card)
  var [ukupnaCijena, setUkupnaCijena] = useState(0)

  const getCijena = () => {
    let cijena = 0
    if(card.length !== 0){  
      card.map(cardItem => {
        cijena = cijena + Number(Data[cardItem.id].price) * Number(cardItem.kolicina)
      })
    }
      setTimeout(() => {
        setUkupnaCijena(cijena)
      }, 300);
  }

  useEffect(()=>{
    getCijena()
  },[card])

  return (<SafeAreaView style={styles.androidSafe}>
     <View style={{padding: 5, borderBottomWidth: 1, borderColor: 'darkgray'}}>
        <Text style={{textAlign: 'center', fontSize: 18}} >Bag</Text>
      </View>
      <View style={styles.podHeader}>
         <Text>Ukupna cijena: <Text style={{fontWeight: 'bold', fontSize: 18}}>{ukupnaCijena + '$'}</Text></Text>
         <TouchableOpacity style={styles.buyBtn}>
           <Fontisto style={{marginRight: 10}} name="shopping-pos-machine" size={24} color="white" />
           <Text style={{color: 'white'}}>Buy</Text>
         </TouchableOpacity>
      </View>
     
      <ScrollView style={{backgroundColor: '#f3f3f3',maxHeight: Dimensions.get('window').height - 151}}>
      {card.length ? card.map(cardItem =>{
          return (<TouchableOpacity onPress={()=>{
            dispatch(itemAction(cardItem.id))    
            navigation.navigate('Item')
          }} key={cardItem.id} style={styles.item}>
            <Image style={styles.slika} source={Data[cardItem.id].img} />
            <View style={{ marginTop: 5 }}>
              <Text style={styles.naslovItem}>{Data[cardItem.id].naslov}<Text style={{fontSize: 13, fontWeight: 'normal'}}> - {Data[cardItem.id].price}$</Text></Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around',alignItems: 'center', width: 60}}>
                  <TouchableOpacity onPress={()=>{
                    dispatch(cardRemoveAction({id: cardItem.id, kolicina: 1}))
                  }}><Ionicons name="ios-remove-outline" size={24} color="black" /></TouchableOpacity>
                  <Text style={{fontSize: 19, marginHorizontal: 10}}>{cardItem.kolicina}</Text>
                  <TouchableOpacity onPress={()=>{
                    dispatch(cardAddAction({id: cardItem.id, kolicina: 1}))
                  }}><Ionicons name="add-outline" size={24} color="black" /></TouchableOpacity>
                </View>
                <Text style={styles.price}>{ Number(Data[cardItem.id].price) * Number(cardItem.kolicina) + ' $' }</Text>
              </View>
            </View>
          </TouchableOpacity>)
        }) : <View style={{height: Dimensions.get('window').height - 150, justifyContent: 'center', alignItems: 'center'}}><Text>No items in Bag</Text></View>}
      </ScrollView>
      <Footer navigation={navigation}  homeS={false} bagS={true} profileS={false}  /> 
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
  item: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  slika: {
    height: 90,
    width: 100,
    borderRadius: 10,
    marginRight: 30
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
    marginLeft: 20
  },
  buyBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#302F2F',
  },
  podHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20
  }
});