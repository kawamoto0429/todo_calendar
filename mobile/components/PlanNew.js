import { View,StyleSheet,  TouchableOpacity } from 'react-native'
import React from 'react'
import Icon2 from 'react-native-vector-icons/AntDesign';

export default function PlanNew({navigation}) {
  return (
    <View style={styles.plan}>
      <TouchableOpacity onPress={()=>navigation.navigate('planCreate')}>
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
  plan:{
    marginRight: 20,
  },
  font:{
    fontSize: 30,
  },
});