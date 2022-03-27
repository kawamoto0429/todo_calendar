import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
  import React, {useContext} from 'react'
import Swipeout from 'react-native-swipeout';
import { valueContext } from '../context/Context';

export function TodoItem ({item, navigation}) {
  const {complete, deleteClick} = useContext(valueContext)
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
        <TouchableOpacity onPress={()=>deleteClick(item.id)}>
          <View style={styles.delete}>
            <Text style={styles.swipeFont}>削除</Text>
          </View>
        </TouchableOpacity>
      )
    }
  ]
  const swipeoutLeft = [
    {
      backgroundColor: "#f5f5f5",
      component:(
        <TouchableOpacity onPress={()=>complete(item.id)}>
          <View style={styles.conplete}>
            {item.complete?(
              <Text style={styles.swipeFont}>解除</Text>
            ):(
              <Text style={styles.swipeFont}>完了</Text>
            )}
          </View>
        </TouchableOpacity>
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
    marginLeft: 20,
    // marginBottom: 8,
    backgroundColor: "#ffffff",
    padding: 17,
    borderRadius: 50,
    backgroundColor: "green",
  },
  delete: {
    marginRight: 20,
    // marginBottom: 8,
    backgroundColor: "#ffffff",
    padding: 17,
    borderRadius: 100,
    backgroundColor: "red",
  },
  swipeFont:{
    fontSize: 10,
  },
});