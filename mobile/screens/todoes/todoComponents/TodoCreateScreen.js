import { View, TextInput, StyleSheet } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'
import { valueContext } from '../../../context/Context';
import ErrorMessages from '../../../components/ErrorMessages';
import { todoContext } from '../../../context/TodoCreate';
import { heroku } from '../../../customHooks/Heroku';


export default function TodoCreateScreen() {
  const {auth, token} = useContext(valueContext)
  const {setFolder, todo, setTodo, memo, setMemo, error, setError} = useContext(todoContext)
  const [folders, setFolders] = useState([])
  useEffect(()=>{
    axios.get(`${heroku}/api/v1/folders/todo`, {
      params:{
        user_id: auth.id
      },
      headers: {
        Authorization: token
      },
    })
    .then((res)=>{
      setFolders(res.data)
    })
    setError([])
  },[])
  const items = folders.map((f)=>({
    label: f.name,
    value: f.id
  }))
  
  return (
    <View>
      <ErrorMessages error={error} />
      <View>
      <TextInput
        style={styles.input}
        onChangeText={(prev)=>setTodo(prev)}
        value={todo}
        placeholder="タイトル"
        autoCapitalize = "none"
      />
      </View>
      <View style={styles.input}>
        <RNPickerSelect
            onValueChange={(prev)=>setFolder(prev)}
            items={items}
            placeholder={{ label: 'フォルダを選択してください', value: '' }}
        />
      </View>
      <View>
      <TextInput
        style={styles.textarea}
        onChangeText={(prev)=>setMemo(prev)}
        value={memo}
        placeholder="メモ"
        multiline={true}
        autoCapitalize = "none"
        
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
  },
  submit:{
    fontSize: 20,
    color: "#00bfff",
    marginStart: 150,
    marginTop: 7,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
  }
});