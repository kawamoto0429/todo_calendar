import React, {useState, useContext} from 'react'
import { valueContext } from './Context'
import axios from 'axios'
import { heroku } from '../customHooks/Heroku';
export const todoContext = React.createContext();

export default function TodoCreate(props) {
  const {onOff, setOnOff, auth, token} = useContext(valueContext)
  const [todo, setTodo] = useState("")
  const [memo, setMemo] = useState("")
  const [error, setError] = useState([])
  const [folder, setFolder] = useState("")
  const valueSubmit = (navigation) => {
    axios
      .post(`${heroku}/api/v1/todoes`, 
      {
        data: {content: todo, folder_id: folder, memo: memo, user_id :auth.id},
      },{
        headers: {
          Authorization: token
        },
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
    <todoContext.Provider value={{folder, setFolder, todo, setTodo, memo, setMemo, error, setError, valueSubmit}}>
      {props.children}
    </todoContext.Provider>
  )
}