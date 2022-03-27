import React, {useState, useEffect} from 'react'
import axios from 'axios';

export const valueContext = React.createContext();

export function Context(props) {
  const [folders, setFolders] = useState([])
  const [todoes, setTodoes] = useState([])
  const [plans, setPlans] = useState([]) 
  const [calendars, setCalendar] = useState([])
  const [auth, setAuth] = useState("")
  const [onOff, setOnOff] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(()=>{
    if (user){
      setAuth(user)
    }
  }, [])

  useEffect(()=>{
    console.log(auth)
    if (auth){
      axios.get("http://localhost:3000/api/v1/folders",
      {
        params:{
          auth: auth.id
        }
      })
      .then((res) => {
        setFolders(res.data);
      });
    }
    
  },[auth, onOff])

  // useEffect(()=>{
  //   axios.get("http://localhost:3000/api/v1/todoes/alone")
  //   .then((res) => {
  //     setTodoes(res.data)
  //   })
  // },[onOff])

  // useEffect(()=>{
  //   axios.get("http://localhost:3000/api/v1/plans/alone")
  //   .then((res) => {
  //     setPlans(res.data)
  //   })
  // },[onOff])

  useEffect(()=>{
    if (auth){
      axios.get("http://localhost:3000/api/v1/plans", {
        params:{
          auth: auth.id
        }
      })
      .then((res) => {
        setCalendar(res.data)
      })
    }
  }, [auth, onOff])


  return (
    <valueContext.Provider value={{folders ,onOff, setOnOff, todoes, plans, calendars, auth, setAuth}}>
      {props.children}
    </valueContext.Provider>
  )
}
