import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'
import { valueContext } from '../../../context/Context';
import ErrorMessages from '../../../components/ErrorMessages';


export default function TodoCreateScreen({ navigation }) {
  const {onOff, setOnOff, auth} = useContext(valueContext)
  const [todo, setTodo] = useState("")
  const [memo, setMemo] = useState("")
  const [folders, setFolders] = useState([])
  const [folder, setFolder] = useState("")
  const [error, setError] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/folders/todo", {
      params:{
        user_id: auth.id
      }
    })
    .then((res)=>{
      setFolders(res.data)
    })
  },[])
  const items = folders.map((f)=>({
    label: f.name,
    value: f.id
  }))
  const valueSubmit = () => {
    axios
      .post("http://localhost:3000/api/v1/todoes", {
        data: {content: todo, folder_id: folder, memo: memo, user_id :auth.id},
      })
      .then((res) => {
        if(res.data.message){
          console.log(res.data.message);
          setError(res.data.message)
          alert("登録できませんでした")
        }else{
          alert(res.data);
          setTodo("")
          setMemo("")
          navigation.navigate('home')
          setOnOff(!onOff)
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <View>
      <View style={styles.h}>
        <Text style={styles.text}>TODO制作</Text>
        <TouchableOpacity onPress={valueSubmit}>
          <Text style={styles.submit}>作成</Text>
        </TouchableOpacity>
      </View>
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
            onValueChange={setFolder}
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