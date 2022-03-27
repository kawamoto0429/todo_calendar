import { View, Text,StyleSheet,  TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import Icon2 from 'react-native-vector-icons/AntDesign';
import axios from 'axios'
import { valueContext } from '../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DATA = "@DATA"

export default function TodoHeader({ navigation }) {
  const {onOff, setOnOff, reItem} = useContext(valueContext)
  const logout = () => {
    reItem()
  }
  return (
    <View style={styles.container}>
      <View style={styles.todo}>
        <TouchableOpacity onPress={()=>navigation.navigate('TodoCreate')}>
          <Icon2
            name='addfile'
            color='black'
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <TouchableOpacity onPress={()=>setOnOff(!onOff)}>
          <Text style={styles.font}>Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>logout()}>
          <Text>logout</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.folder}>
        <TouchableOpacity onPress={()=>navigation.navigate('FolderCreate')}>
          <Icon2
            name='addfolder'
            color='black'
            size={25}
          />
        </TouchableOpacity>
      </View>
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: 'space-between',
    backgroundColor: "yellow",
    borderBottomWidth: 1,
  },
  todo: {
    marginLeft:20,
  },
  center:{
    alignItems: "center",
  },
  folder:{
    marginRight: 20,
  },
  font:{
    fontSize: 30,
  },
});