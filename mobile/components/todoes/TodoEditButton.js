import {Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { valueContext } from '../../context/Context'
import axios from "axios"
import { heroku } from '../../customHooks/Heroku'

export default function TodoEditButton({id}) {
  const {auth, memo1, token} = useContext(valueContext)
  const [todo, setTodo] = useState([])
  useEffect(()=>{
    axios.get(`${heroku}/api/v1/todoes/${id}`, {
      headers: {
        Authorization: token
      },
    })
    .then((res)=>{
      setTodo(res.data)
    })
    .catch((error) => console.log(error));
  }, [])
  const valueSubmit = (id) => {
    axios.patch(`https://todoandcalendar.herokuapp.com/api/v1/todoes/${id}`, {
      data: {content: todo.content, folder_id: todo.folder_id, memo: memo1, user_id :auth.id},
    },{
      headers: {
        Authorization: token
      },
    })
    .then((res) => {
      alert(res.data)
    })
    .catch((error) => {
      alert(error);
    });
  }
  return (
    <TouchableOpacity onPress={()=>valueSubmit(id)}>
      <Text style={styles.font}>Edit</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  font:{
    marginRight: 25,
    color: "#00bfff",
    fontSize: 16,
    fontWeight: "bold",
  }
});