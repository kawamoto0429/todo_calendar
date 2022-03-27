
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
  useEffect(()=>{
    if (auth){
      axios.get("http://localhost:3000/api/v1/folders",{
        params:{
          id: auth.id,
          password: auth.password_digest
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
      axios.get("http://localhost:3000/api/v1/todoes", {
        params:{
          id: auth.id,
          password: auth.password_digest
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
      axios.get("http://localhost:3000/api/v1/plans",{
        params:{
          id: auth.id,
          password: auth.password_digest
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
    axios.delete(`http://localhost:3000/api/v1/todoes/${id}`,{
      params: {
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
    .get(`http://localhost:3000/api/v1/todoes/${id}/complete`, {
      params: {
        user_id: auth.id
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
      const todoString = JSON.stringify(data);
      await AsyncStorage.setItem("user", todoString);
    } catch (e) {
      console.log(e)
    }
  }
  const loadItem = async () => {
    const item = await AsyncStorage.getItem("user");
    if (item !== null){
      console.log(JSON.parse(item))
      setAuth(JSON.parse(item))
    }else{
      console.log(item)
      setAuth("")
    }
  }
  const reItem = async() => {
    try {
      AsyncStorage.removeItem("user");
      loadItem()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <valueContext.Provider value={{onOff, setOnOff, todoes, plans, folders, auth, setAuth, saveItem, loadItem, reItem,deleteClick, complete, memo1, setMemo}}>
      {props.children}
    </valueContext.Provider>
  )
}