import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useContext} from 'react'
import axios from 'axios';
import { valueContext } from '../../context/Context';
import ErrorMessages from '../../components/ErrorMessages';

export default function UserCreateScreen() {
  const {saveItem, loadItem} = useContext(valueContext);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPassword_confirmation] = useState("")
  const [error, setError] = useState([])
  const valueSubmit = () => {
    axios.post(`https://todoandcalendar.herokuapp.com/api/v1/users`, {
      user: {email: email, password: password, password_confirmation: password_confirmation}
    },
    { withCredentials: true }
    )
    .then((res)=>{
      if(res.data.message){
        console.log(res.data.message)
        setError(res.data.message)
        alert("登録できませんでした")
      }else{
        saveItem(res.data)
        loadItem()
      }
    })
    .catch((error) => console.log(error));
  }

  return (
    <View>
      <View style={styles.h}>
        <Text style={styles.auth}>新規登録</Text>
      </View>
      <ErrorMessages error={error} />
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="メールアドレス"
          autoCapitalize = "none"
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="パスワード"
          autoCapitalize = "none"
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setPassword_confirmation}
          value={password_confirmation}
          placeholder="確認パスワード"
          autoCapitalize = "none"
        />
      </View>
      <View>
        <TouchableOpacity onPress={valueSubmit}>
        <View style={styles.sign}>
            <Text style={styles.text}>新規登録</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  h:{
    marginTop: 40,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  auth:{
    fontSize: 30,
    fontWeight: "bold",
  },  
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  sign: {
    height: 50,
    margin: 20,
    marginTop: 30,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  new:{
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  errorBox:{
    marginLeft:20,
  },
  error:{
    fontSize: 15,
    color: "#ff7676",
  }
});