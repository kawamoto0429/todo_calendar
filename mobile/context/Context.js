
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const valueContext = React.createContext();

export function Context(props) {
  const [onOff, setOnOff] = useState(false)
  const [folders, setFolders] = useState([])
  const [todoes, setTodoes] = useState([])
  const [plans, setPlans] = useState([])
  const [auth, setAuth] = useState("")
  const [memo1, setMemo] = useState("")
  const [token, setToken] = useState("")
  useEffect(()=>{
    if (auth){
      axios.get("https://todoandcalendar.herokuapp.com/api/v1/folders",
      {
        headers: {
          Authorization: token
        },
        params:{
          user_id: auth.id
        }
      })
      .then((res) => {
        if (res.data != "error"){
          console.log(res.data)
          setFolders((prev)=>res.data);
        }else{
          console.log(res.data)
          reItem()
        }
      });
    }else{
      console.log("no")
    }
  }, [onOff, auth])
  useEffect(()=>{
    if (auth){
      axios.get("https://todoandcalendar.herokuapp.com/api/v1/todoes", 
      {
        headers: {
          Authorization: token
        },
        params:{
          user_id: auth.id
        }
      })
      .then((res) => {
        if (res.data != "error"){
          console.log(res.data)
          setTodoes((prev)=>res.data);
        }else{
          console.log(res.data)
          reItem()
        }
      });
    }
  },[auth, onOff])
  useEffect(()=>{
    if (auth){
      axios.get("https://todoandcalendar.herokuapp.com/api/v1/plans",
      {
        headers: {
          Authorization: token
        },
        params:{
          user_id: auth.id
        }
      })
      .then((res) => {
        if (res.data != "error"){
          console.log(res.data)
          setPlans((prev)=>res.data);
        }else{
          console.log(res.data)
          reItem()
        }
      });
    }
  },[auth])
  useEffect(()=>{
    loadItem()
  }, [])
  const deleteClick = (id) => {
    axios.delete(`https://todoandcalendar.herokuapp.com/api/v1/todoes/${id}`,
      {
        headers: {
          Authorization: token
        },
        params:{
          user_id: auth.id
        }
      })
    .then((res) => {
      console.log(res.data)
      setOnOff(!onOff)
    });
  }

  const complete = (id) => {
    axios
    .get(`https://todoandcalendar.herokuapp.com/api/v1/todoes/${id}/complete`, {
      headers: {
        Authorization: token
      }
    })
    .then((res) => {
      if(res.data === "error"){
        alert(res.data)
      }
      setOnOff(!onOff)
    } );
  }

  const saveItem = async(data) => {
    try {
      const todoString = JSON.stringify(data.user);
      await AsyncStorage.setItem("user", todoString);
      const tokenString = JSON.stringify(data.jwt)
      await AsyncStorage.setItem("token", tokenString);
      console.log("ok")
    } catch (e) {
      console.log(e)
    }
  }
  const loadItem = async () => {
    const item = await AsyncStorage.getItem("user");
    const apitoken = await AsyncStorage.getItem("token");
    if (item !== null){
      console.log(JSON.parse(apitoken))
      console.log(JSON.parse(item))
      setToken(JSON.parse(apitoken))
      setAuth(JSON.parse(item))
    }else{
      setToken("")
      setAuth("")
    }
  }
  const reItem = async() => {
    try {
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("token");
      loadItem()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <valueContext.Provider value={{onOff, setOnOff, todoes, plans, folders, auth, setAuth, saveItem, loadItem, reItem,deleteClick, complete, memo1, setMemo, token}}>
      {props.children}
    </valueContext.Provider>
  )
}