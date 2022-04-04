import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon2 from 'react-native-vector-icons/AntDesign';

export default function TodoNew({navigation}) {
  return (
    <View style={styles.todo}>
    <TouchableOpacity onPress={()=>navigation.navigate('TodoCreate')}>
      <Icon2
        name='addfile'
        color='black'
        size={25}
      />
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
  todo: {
    marginLeft:20,
  },
  font:{
    fontSize: 30,
  },
});