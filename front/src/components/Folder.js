import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {valueContext} from "../context/Context"

export default function Folder() {
  const {onOff, setOnOff, auth} = useContext(valueContext)
  const [folder, setFolder] = useState("")
  const [f, setF] = useState(1)
  const [format, setFormat] = useState([])
  const navigation = useNavigate();
  useEffect(()=>{
    console.log(auth)
    axios
      .get("http://localhost:3000/api/v1/formats/index")
      .then((res) => {
      console.log(res.data)
      setFormat(res.data);
      console.log(format)
    });
  },[])

  const inputValue = (e) => {
    setFolder(e.target.value)
  }
  const handleClick = (e) => {
    setF( prev => e.target.value)
    console.log(f)
  }

  const valueSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/folders", {
        data: {name: folder, format: f, user_id: auth.id},
      })
      .then((res) => {
        console.log(res);
        setFolder("");
        navigation("/");
        setOnOff(!onOff)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>フォルダー追加</h1>
      <input type="text" name="name" value={folder} onChange={inputValue}/>
      <select value={f} onChange={handleClick}>
        {format.map((item)=>{
          return (<option key={item.id} value={item.id}>{item.name}</option>)
        })}
      </select>
      <button type="submit" onClick={valueSubmit}>追加</button>
    </div>
  )
}
