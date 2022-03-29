import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios'
import moment from 'moment';
import { valueContext } from '../../context/Context';
import ErrorMessages from '../../components/ErrorMessages';
import { planContext } from '../../context/PlanCreate';

export default function PlanCreateScreen({navigation}) {
  const {auth, onOff, setOnOff} = useContext(valueContext)
  const {title, setTitle, place, setPlace, setStartDate, setStartTime, setEndDate, setEndTime, memo, setMemo, setFolder, error, setError, startDateLook, setStartDateLook, startTimeLook, setStartTimeLook, endDateLook, setEndDateLook, endTimeLook, setEndTimelook} = useContext(planContext)
  const [folders, setFolders] = useState([])

  useEffect(()=>{
    axios.get("https://todoandcalendar.herokuapp.com/api/v1/folders/plan", {
      params:{
        user_id: auth.id
      }
    })
    .then((res)=>{
      setFolders(res.data)
    })
    setTitle("")
    setPlace("")
    setStartDate("0000-00-00")
    setStartTime('00:00')
    setStartDateLook("0000/00/00")
    setStartTimeLook('00:00')
    setEndDate("0000-00-00")
    setEndTime('00:00')
    setEndDateLook("0000/00/00")
    setEndTimelook('00:00')
    setMemo("")
    setFolder("")
    setError([])
  },[])
  const items = folders.map((f)=>({
    label: f.name,
    value: f.id
  }))
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const target = moment(date)
    setStartDate(target.format("YYYY-MM-DD"))
    setStartDateLook(target.format('YYYY/MM/DD'))
    hideDatePicker();
  };
  const [isDatePickerVisibleTime, setDatePickerVisibilityTime] = useState(false);

  const showDatePickerTime = () => {
    setDatePickerVisibilityTime(true);
  };

  const hideDatePickerTime = () => {
    setDatePickerVisibilityTime(false);
  };

  const handleConfirmTime = (date) => {
    const target = moment(date)
    setStartTime(target.format("HH:mm"))
    setStartTimeLook(target.format('HH:mm'))
    hideDatePickerTime();
  };
  const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false);

  const showDatePickerEnd = () => {
    setDatePickerVisibilityEnd(true);
  };

  const hideDatePickerEnd = () => {
    setDatePickerVisibilityEnd(false);
  };

  const handleConfirmEnd = (date) => {
    console.log(date)
    const target = moment(date)
    setEndDate(target.format("YYYY-MM-DD"))
    setEndDateLook(target.format('YYYY/MM/DD'))
    hideDatePickerEnd();
  };
  const [isDatePickerVisibleEndTime, setDatePickerVisibilityEndTime] = useState(false);

  const showDatePickerEndTime = () => {
    setDatePickerVisibilityEndTime(true);
  };

  const hideDatePickerEndTime = () => {
    setDatePickerVisibilityEndTime(false);
  };

  const handleConfirmEndTime = (date) => {
    console.log(date)
    const target = moment(date)
    setEndTime(target.format("HH:mm"))
    setEndTimelook(target.format('HH:mm'))
    hideDatePickerEndTime();
  };
  return (
    <View>
      <View>
        <ErrorMessages error={error} />
      </View>
      <View>
      <TextInput
        style={styles.input}
        onChangeText={prev=>setTitle(prev)}
        value={title}
        placeholder="タイトル"
        autoCapitalize = "none"
      />
      </View>
      <View>
      <TextInput
        style={styles.input}
        onChangeText={prev=>setPlace(prev)}
        value={place}
        placeholder="場所"
        autoCapitalize = "none"
      />
      </View>
      <View style={styles.input}>
        <RNPickerSelect
            onValueChange={setFolder}
            items={items}
            placeholder={{ label: 'フォルダを選択してください', value: '' }}
        />
      </View>
      <View>
      <TextInput
        style={styles.textarea}
        onChangeText={prev=>setMemo(prev)}
        value={memo}
        placeholder="メモ"
        autoCapitalize = "none"
      />
      </View>
      <View>
        
      </View>
      <View style={styles.datetime}>
        <View style={styles.label}>
          <Text style={styles.font}>開始時間</Text>
        </View>
        <View style={styles.flex}>
        <View style={styles.date}>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.font}>{startDateLook}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.time}>
          <TouchableOpacity onPress={showDatePickerTime}>
            <Text style={styles.font}>{startTimeLook}</Text>
          </TouchableOpacity>
        </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisibleTime}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideDatePickerTime}
        />
      </View>
      <View style={styles.datetime}>
        <View style={styles.label}>
          <Text style={styles.font}>終了時間</Text>
        </View>
        <View style={styles.flex}>
          <View style={styles.date}>
            <TouchableOpacity onPress={showDatePickerEnd}>
              <Text style={styles.font}>{endDateLook}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.time}>
            <TouchableOpacity onPress={showDatePickerEndTime}>
              <Text style={styles.font}>{endTimeLook}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisibleEnd}
          mode="date"
          onConfirm={handleConfirmEnd}
          onCancel={hideDatePickerEnd}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisibleEndTime}
          mode="time"
          onConfirm={handleConfirmEndTime}
          onCancel={hideDatePickerEndTime}
        />
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  h: {
    margin: 20,
    flexDirection: 'row',
  },  
  text: {
    fontSize: 30,
    marginEnd: 180,
  },
  submit:{
    fontSize: 20,
    color: "#00bfff",
    marginTop: 7,
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 4,
  },
  textarea:{
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 4,
  },
  datetime: {
    margin: 12,
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    borderRadius: 4,
    justifyContent: 'space-between',
  },
  flex: {
    flexDirection: 'row',
  },
  label: {
    marginEnd: 70,
  },
  font: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date:{
    borderRadius: 4,
    backgroundColor: "#dcdcdc",
  },
  time:{
    borderRadius: 4,
    backgroundColor: "#dcdcdc",
    marginStart: 10,
  }
});