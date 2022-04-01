import React, {useState, useEffect, useContext} from 'react'
import axios from "axios"
import {valueContext} from "../../context/Context"
import {useNavigate, Link} from 'react-router-dom'

export default function Login() {
  const {auth, setAuth} = useContext(valueContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const navigation = useNavigate();
  const inputValue = ((e)=>{
    setUser(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  })

  const valueSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/v1/loginIn", {
      user
    })
    .then((res)=>{
      console.log(res.data)
      if(res.data !== "error"){
        localStorage.setItem("user", JSON.stringify(res.data.user))
        localStorage.setItem("token", JSON.stringify(res.data.jwt))
        navigation("/");
        window.location.reload()
      }else{
        setUser(()=>({
          email: "",
          password: "",
        }))
        navigation("/login");
      }
    })
    .catch((error) => console.log(error));
  }
  return (
    <div>
      <form onSubmit={valueSubmit}>
        <div>
          <label>Email</label>
          <input type="email" name="email" onChange={inputValue} />
        </div>
        <div>
          <label>password</label>
          <input type="password" name="password" onChange={inputValue} />
        </div>
        <div><button>ログインだよ</button></div>
        <div><Link to="/signup">新規登録</Link></div>
      </form>
      
    </div>
  )
}
