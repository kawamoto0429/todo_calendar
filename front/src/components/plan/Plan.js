import React, {useState, useEffect, useContext} from 'react'
import {valueContext} from "../../context/Context";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function Plan() {
  const {folders, onOff, setOnOff, auth} = useContext(valueContext)
  const navigation = useNavigate()
  const [data, setData] = useState({
    title: "",
    place: "",
    memo: "",
    start: "",
    timestart:"",
    timeend: "",
    end: "",
  })
  const [folder, setFolder] = useState(null)

  const handleInput = (e) => {
    setData((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e) => {
    setFolder(e.target.value)
  }

  const valueSubmit = () => {
    console.log(folder)
    axios.post("http://localhost:3000/api/v1/plans", {
        data: {
                title: data.title, 
                place: data.place,
                startDate: data.start,
                startTime: data.timestart,
                endDate: data.end,
                endTime: data.timeend,
                memo: data.memo,
                folder_id: folder,
                user_id: auth.id,
              },
      })
      .then((res) => {
        console.log(res);
        setData("")
        setOnOff(!onOff)
        navigation("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const planFolders = folders.filter((f)=>{return f.format_id === 1 })

  return (
    <div>
      <h1>予定追加</h1>
      <div>
        <div>
          <label>title</label>
          <input 
            type="text" 
            name="title" 
            value={data.title} 
            onChange={handleInput}
          />
        </div>
        <div>
          <label>place</label>
          <input 
            type="text" 
            name="place" 
            value={data.place} 
            onChange={handleInput}
          />
        </div>
        <div>
          <label>start</label>
          <input 
            type="date" 
            name="start" 
            value={data.start} 
            onChange={handleInput} 
          />
        </div>
        <div>
          <label>start</label>
          <input 
            type="time" 
            name="timestart" 
            value={data.timestart} 
            onChange={handleInput} 
          />
        </div>
        <div>
          <label>end</label>
          <input 
            type="date" 
            name="end" 
            value={data.end} 
            onChange={handleInput} 
          />
        </div>
        <div>
          <label>end</label>
          <input 
            type="time" 
            name="timeend" 
            value={data.timeend} 
            onChange={handleInput} 
          />
        </div>
        {planFolders.length === 0? (
        <div>
          <label>フォルダー選択</label>
          <select onChange={handleInput}>
            <option>フォルダーがまだありません</option>
          </select>
        </div>  
      ):(
        <div>
          <label>フォルダー選択</label>
          <select onChange={handleClick}>
            <option >選択してください</option>
            {planFolders.map((f)=>{
              return (
                <option key={f.id} value={f.id}>{f.name}</option>
              )
            })}
          </select>
      </div>
      )}
        <div>
          <label>memo</label>
          <textarea 
            type="text"
            name="memo"
            value={data.memo} 
            onChange={handleInput}
          />
        </div>
        <div>
          <button type="submit" onClick={valueSubmit} >追加</button>
        </div>
      </div>
    </div>
  )
}
