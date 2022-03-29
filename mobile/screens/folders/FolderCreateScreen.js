import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'
import { valueContext } from '../../context/Context';
import ErrorMessages from '../../components/ErrorMessages';
import { folderContext } from '../../context/FolderCreate';

export default function FolderCreateScreen({ navigation }) {
  // const {onOff, setOnOff, auth} = useContext(valueContext)
  const {folder, setFolder, setFormat, error, setError} = useContext(folderContext)
  const [formats, setFormats] = useState([])
  useEffect(()=>{
    axios.get("https://todoandcalendar.herokuapp.com/api/v1/formats/index")
    .then((res)=>{
      setFormats(res.data)
    })
    setError([])
  }, [])
  const item = formats.map((f)=>{
    return(
      {
        label: f.name,
        value: f.id,
      }
    )
  })
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
      <ErrorMessages error={error} />
      <View>
      <TextInput
        style={styles.input}
        onChangeText={prev=>setFolder(prev)}
        value={folder}
        placeholder="フォルダ名"
        autoCapitalize = "none"
      />
      </View>
      <View style={styles.input}>
        <RNPickerSelect
          onValueChange={setFormat}
          items={item}
          placeholder={{ label: 'フォーマット選択', value: '' }}
      />
      </View>
      </>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  h: {
    margin: 20,
    flexDirection: 'row',
  },  
  text: {
    fontSize: 30,
    marginEnd: 120,
  },
  submit:{
    fontSize: 20,
    color: "#00bfff",
    marginTop: 7,
  },
  input: {
    margin: 20,
    borderWidth: 1,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 4,
  },
});