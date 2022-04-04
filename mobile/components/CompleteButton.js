import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import { valueContext } from '../context/Context'

export default function CompleteButton({id, completed}) {
  const {complete} = useContext(valueContext)
  return (
    <TouchableOpacity onPress={()=>complete(id)}>
      <View style={styles.conplete}>
        {completed?(
          <Text style={styles.swipeFont}>解除</Text>
        ):(
          <Text style={styles.swipeFont}>完了</Text>
        )}
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  conplete: {
    alignItems: 'center',
    backgroundColor: "#ffffff",
    padding: 17,
    borderRadius: 50,
    backgroundColor: "green",
  },
  swipeFont:{
    fontSize: 12,
    fontWeight: "bold"
  },
});