import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import Swipeout from 'react-native-swipeout';
import { DeleteButton } from '../DeleteButton';
import CompleteButton from '../CompleteButton';
import { valueContext } from '../../context/Context';

export function TodoItem ({item, navigation}) {
  const {deleteClick} = useContext(valueContext)
  const fontColor = StyleSheet.create({
    completeFont: {
      fontSize: 20,
      color: item.complete? "#c0c0c0":"black",
    }
  })
  const swipeoutRight = [
    {
      backgroundColor: "#f5f5f5",
      component:(
        <DeleteButton id={item.id} deleteClick={deleteClick} />
      )
    }
  ]
  const swipeoutLeft = [
    {
      backgroundColor: "#f5f5f5",
      component:(
        <CompleteButton id={item.id} completed={item.complete} />
      )
    }
  ]

  return (
    <Swipeout
      style={{backgroundColor: "#f5f5f5"}}
      left={swipeoutLeft}
      right={swipeoutRight}
     >
    <TouchableOpacity onPress={()=>navigation.navigate('todoDetail', item.id)}>
      <View style={styles.box}>
        <Text style={fontColor.completeFont}>{item.content}</Text>
      </View>
    </TouchableOpacity>
    </Swipeout>
  )
}
const styles = StyleSheet.create({
  box: {
    backgroundColor: "#ffffff",
    padding: 12,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#f8f8ff",
    borderRadius: 8,
  },
  conplete: {
    alignItems: 'center',
    backgroundColor: "#ffffff",
    padding: 17,
    borderRadius: 50,
    backgroundColor: "green",
  },
  delete: {
    alignItems: 'center',
    backgroundColor: "#ffffff",
    padding: 17,
    borderRadius: 10,
    backgroundColor: "red",
  },
  swipeFont:{
    fontSize: 10,
  },
});