import { View } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import TodoMemo from './TodoMemo'
import { valueContext } from '../../../context/Context'

export default function TodoDetailScreen({route}) {
  const id = route.params
  const {auth} = useContext(valueContext)
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
  return (
    <View>
      {
        <TodoMemo todo={todo} />
      }
    </View>
  )
}