import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment';

export const PlanItem = ({item, navigation}) =>{
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('planDetail',item.id)}>
      <View style={styles.box2}>
        <View style={styles.title}>
        <Text style={styles.font}>{item.title}</Text>
        </View>
        <View style={styles.datetime}>
          <Text>開始日</Text>
          <Text>{moment(item.start).format('YYYY/MM/DD')}</Text>
        </View>
        <View style={styles.datetime}>
          <Text>開始時間</Text>
          {item.timestart !== "2000-01-01T00:00:00.000Z" && 
            <Text>
              {moment(item.timestart).subtract(540, 'm').format('HH:mm')}
            </Text>
          }
        </View>
        <View style={styles.datetime}>
          <Text>終了日</Text>
          {item.end && 
            <Text>{moment(item.end).format('YYYY/MM/DD')}</Text>
          }
        </View>
        <View style={styles.datetime}>
            <Text>終了時間</Text>
            {item.timeend !== "2000-01-01T00:00:00.000Z" && 
            <Text>
              {moment(item.timeend).subtract(540, 'm').format('HH:mm')}
            </Text>
            }
        </View> 
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  plans: {
    marginHorizontal: 15,
    borderRadius: 8,
  },
  font: {
    fontSize: 20,
    fontWeight: "bold"
  },
  box2: {
    margin: 15,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
  },
  title: {
    margin: 10,
    paddingBottom: -10,
  },
  datetime: {
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    padding: 12,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#f8f8ff",
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  calendar: {
    borderBottomWidth: 1,
    height: 330,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
});
