import React, {useState, useEffect, useContext} from 'react'
import {valueContext} from "../../context/Context"
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function Todo() {
  const {folders, onOff,setOnOff, auth, token} = useContext(valueContext)
  const [content, setContent] = useState("")
  const [memo, setMemo] =useState("")
  const [folder, setFolder] = useState(null)
  const navigation = useNavigate();

  const inputValue = (e) => {
    setContent(prev=>e.target.value)
  }

  const inputMemo = (e) => {
    console.log(memo)
    if(e.target.value === ""){
      setMemo("")
    }else{
      setMemo(prev=>e.target.value)
    }
  }

  const handleClick = (e) => {
    console.log(e.target.value)
    setFolder(e.target.value)
  }

  const valueSubmit = () => {
    console.log(folder)
    axios.post("http://localhost:3000/api/v1/todoes", {
        data: {content: content, folder_id: folder, memo: memo, user_id: auth.id}
      },{
        headers:{
           Authorization: token 
        }
      })
      .then((res) => {
        console.log(res);
        setContent('')
        setMemo("")
        setOnOff(!onOff)
        navigation("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const todoFolders = folders.filter((f)=>{return f.format_id === 2 })

  return (
    <div>
      <h1>todo追加</h1>
      <div><input type="text" value={content} onChange={inputValue}/></div>
      {todoFolders.length === 0? (
        <div>
          <select onChange={handleClick}>
            <option>フォルダーがまだありません</option>
          </select>
        </div>  
      ):(
        <div>
          <select onChange={handleClick}>
            <option >選択してください</option>
            {todoFolders.map((f)=>{
              return (
                <option key={f.id} value={f.id}>{f.name}</option>
              )
            })}
          </select>
      </div>
      )}
      <div>
        <textarea type="text" value={memo} onChange={inputMemo}/>
      </div>
      <div>
      <button type="submit" onClick={valueSubmit}>追加する</button>
      </div>
    </div>
  )
}
