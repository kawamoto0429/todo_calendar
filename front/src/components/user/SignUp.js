import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import {valueContext} from "../../context/Context"
import {useNavigate} from 'react-router-dom'

export default function SingUp() {
  const {auth, setAuth} = useContext(valueContext)
  const [user, setUser] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  })
  const navigation = useNavigate();
  const inputValue = ((e)=>{
    setUser((prev)=>({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  })
  const valueSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3000/api/v1/users`, {
      user
    },
    { withCredentials: true }
    )
    .then((res)=>{
      if(res.data !== "error"){
        localStorage.setItem("user", JSON.stringify(res.data.user))
        localStorage.setItem("token", JSON.stringify(res.data.jwt))
        navigation("/");
        window.location.reload()
      }else{
        setUser(()=>({
          email: "",
          password: "",
          password_confirmation: "",
        }))
        navigation("/signup");
      }
    })
    .catch((error) => console.log(error));
  }

  return (
    <div>
      <form onSubmit={valueSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email} 
          onChange={inputValue}
        />
      </div>
      <div>
        <label>password</label>
        <input
         type="password" 
         name="password" 
         value={user.password} 
         onChange={inputValue}
        />
      </div>
      <div>
        <label>確認パスワード</label>
        <input 
          type="password" 
          name="password_confirmation" 
          value={user.password_confirmation} 
          onChange={inputValue}
        />
      </div>
      <button>新規登録</button>
      </form>
    </div>
  )
}
