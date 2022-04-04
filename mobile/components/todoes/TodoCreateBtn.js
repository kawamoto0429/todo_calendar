import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import {todoContext} from '../../context/TodoCreate';

export default function TodoCreateBtn({navigation}) {
  const {valueSubmit} = useContext(todoContext)
  return (
    <TouchableOpacity onPress={()=>valueSubmit(navigation)}>
      <Text style={styles.font}>作成</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  font:{
    marginRight: 25,
    color: "#00bfff",
    fontSize: 16,
    fontWeight: "bold",
  }
});