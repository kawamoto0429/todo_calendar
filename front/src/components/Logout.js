import React, {useContext} from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import {valueContext} from "../context/Context"

export default function Logout() {
  const {auth} = useContext(valueContext);
  const navigation = useNavigate();
  const logOut = (e) => {
    e.preventDefault()
    axios.get("http://localhost:3000/api/v1/logout")
    .then((res)=>{
      console.log(res.data)
    })
    .catch((error) => console.log(error));
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigation("/logout");
    window.location.reload()
  }
  return (
    <div>
      <button onClick={logOut} >ログアウト</button>
    </div>
  )
}
