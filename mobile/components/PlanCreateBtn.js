import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React, {useContext} from 'react'
import { planContext } from '../context/PlanCreate';

export default function PlanCreateBtn({navigation}) {
  const {valueSubmit} = useContext(planContext)
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