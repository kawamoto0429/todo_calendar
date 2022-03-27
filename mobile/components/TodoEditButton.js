import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { valueContext } from '../context/Context'
import axios from "axios"

export default function TodoEditButton({id}) {
  const {auth, memo1} = useContext(valueContext)
  const [todo, setTodo] = useState([])
  useEffect(()=>{
    axios.get(`http://localhost:3000/api/v1/todoes/${id}`, {
      params:{
        user_id: auth.id
      }
    })
    .then((res)=>{
      setTodo(res.data)
    })
    .catch((error) => console.log(error));
  }, [])
  const valueSubmit = (id) => {
    axios.patch(`http://localhost:3000/api/v1/todoes/${id}`, {
      data: {content: todo.content, folder_id: todo.folder_id, memo: memo1, user_id :auth.id},
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