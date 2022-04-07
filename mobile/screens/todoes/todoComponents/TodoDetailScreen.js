import { View } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import TodoMemo from './TodoMemo'
import { valueContext } from '../../../context/Context'
import { heroku } from '../../../customHooks/Heroku'

export default function TodoDetailScreen({route}) {
  const id = route.params
  const {auth, token} = useContext(valueContext)
  const [todo, setTodo] = useState([])
  useEffect(()=>{
    axios.get(`${heroku}/api/v1/todoes/${id}`, {
      params:{
        user_id: auth.id
      },
      headers: {
        Authorization: token
      },
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