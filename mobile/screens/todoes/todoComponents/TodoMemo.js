import { View, TextInput, StyleSheet } from 'react-native'
import React, {useEffect, useContext} from 'react'
import { valueContext } from '../../../context/Context'

export default function TodoMemo({todo}) {
  const {memo1, setMemo} = useContext(valueContext)
  const {memo} = todo
  useEffect(()=>{
    setMemo(memo)
  }, [memo])
  
  return (
    <View>
      <TextInput
        onChangeText={(prev)=>setMemo(prev)}
        value={memo1}
        placeholder="メモはありません"
        multiline={true}
        style={styles.font}
        autoCapitalize = "none"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  font:{
    fontSize: 20,
    margin: 10,
  }
});