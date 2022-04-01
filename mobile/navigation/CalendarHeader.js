import { View, Text,StyleSheet,  TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import Icon2 from 'react-native-vector-icons/AntDesign';

export default function CalendarHeader({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.empty}>
      </View>
      <View style={styles.center}>
        <Text style={styles.font}>Calendar</Text>
      </View>
      <View style={styles.plan}>
        <TouchableOpacity onPress={()=>navigation.navigate('planCreate')}>
          <Icon2
            name='addfile'
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
    backgroundColor: "#ffc0cb",
    borderBottomWidth: 1,
  },
  center:{
    alignItems: "center",
    marginRight: -45,
  },
  plan:{
    marginRight: 20,
  },
  font:{
    fontSize: 30,
  },
});