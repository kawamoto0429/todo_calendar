import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import {useContext} from 'react'
import  { folderContext } from '../context/FolderCreate';

export default function FolderCreateBtn({ navigation }) {
  const {valueSubmit} = useContext(folderContext)
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