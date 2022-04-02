import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon2 from 'react-native-vector-icons/AntDesign';

export default function FolderNew({navigation}) {
  return (
    <View style={styles.folder}>
      <TouchableOpacity onPress={()=>navigation.navigate('FolderCreate')}>
        <Icon2
          name='addfolder'
          color='black'
          size={25}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  folder:{
    marginRight: 20,
  },
  font:{
    fontSize: 30,
  },
});