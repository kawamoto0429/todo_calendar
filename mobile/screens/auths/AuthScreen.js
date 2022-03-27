import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, {useState, useContext} from 'react'
import axios from 'axios'
import { valueContext } from '../../context/Context';
const DATA = "@DATA"

export default function AuthScreen({navigation}) {
  const {saveItem, loadItem} = useContext(valueContext);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const valueSubmit = () => {
    console.log(email)
    console.log(password)
    axios.post("http://localhost:3000/api/v1/loginIn", {
      user: {email: email, password: password}
    })
    .then((res)=>{
      if(res.data === "error"){
        alert("ログインできませんでした。")
        setError(true)
      }else{
        saveItem(res.data)
        loadItem()
      }
    })
    .catch((error) => console.log(error));
  }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={()=>console.log(15)}>
      <>
      <View style={styles.h}>
        <Text style={styles.auth}>ログイン認証</Text>
      </View>
      {
        error && (
          <View style={styles.errorBox}>
            <Text style={styles.error}>※メールアドレスかパスワードが違います</Text>
          </View>
        )
      }
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
          secureTextEntry={true}
        />
      </View>
      <View>
        <TouchableOpacity onPress={valueSubmit}>
          <View style={styles.login}>
            <Text style={styles.text}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.new}>
        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
          <Text style={styles.text}>新規登録</Text>
        </TouchableOpacity>
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
  login: {
    height: 50,
    margin: 20,
    marginTop: 30,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#00ff7f",
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