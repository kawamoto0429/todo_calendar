import { View, ScrollView, RefreshControl, StyleSheet, SafeAreaView, FlatList} from 'react-native'
import React, {useState, useEffect, useContext, useCallback} from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import axios from 'axios'
import { valueContext } from '../../context/Context';
import { PlanItem } from '../../components/plans/PlanItem';
import { heroku } from '../../customHooks/Heroku';

export default function Calendario({ navigation }) {
  const {auth, token, onOff} = useContext(valueContext)
  const [dates, setDates] = useState("")
  const [dateSelected, setDateSelected] = useState({})
  const today = new Date()
  const [date, setDate] = useState(today)
  // const [refreshing, setRefreshing] = useState(false);
  // const wait = (timeout) => {
  //   return new Promise(resolve => setTimeout(resolve, timeout));
  // }
  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   wait(2000).then(() => {
  //     setRefreshing(false)
  //     navigation.navigate('home')
  //   });
  // }, []);
  useEffect(()=>{
    console.log(date)
    axios.get(`${heroku}/api/v1/plans/find`, {
      params: {
        date: date,
        user_id: auth.id
      },
      headers: {
        Authorization: token
      },
    })
    .then((res)=>{
      setDates(res.data)
    })
  }, [date, onOff])

  const renderItem = ({ item }) => (
    <PlanItem item={item} navigation={navigation} />
  );
  
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      > */}
      <View style={styles.calendar}>
      <Calendar
        minDate={'2000-01-01'}
        maxDate={'2100-12-31'}
        onDayPress={day => {
          setDate(day.dateString)
          console.log(day.dateString)
          setDateSelected({[day.dateString]:{selected: true, selectedColor: '#466A8F'}})
          console.log(dateSelected)
        }}
        monthFormat={'yyyy??? MM???'}
        enableSwipeMonths={true}
        markedDates={dateSelected}
      />
      </View>
      <FlatList
        data={dates}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  )
}

LocaleConfig.locales.jp = {
  monthNames: ['1???', '2???', '3???', '4???', '5???', '6???', '7???', '8???', '9???', '10???', '11???', '12???'],
  monthNamesShort: ['1???', '2???', '3???', '4???', '5???', '6???', '7???', '8???', '9???', '10???', '11???', '12???'],
  dayNames: ['?????????', '?????????', '?????????', '?????????', '?????????', '?????????', '?????????'],
  dayNamesShort: ['???', '???', '???', '???', '???', '???', '???'],
};
LocaleConfig.defaultLocale = 'jp';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    margin: 20,
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
  name:{
    fontSize: 30,
  },
  calendar: {
    borderBottomWidth: 1,
    height: 355,
    backgroundColor: '#fff',
    marginBottom: 25,
  },
  scrollView: {
    flex: 1,
  },
});