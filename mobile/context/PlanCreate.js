import React, {useState, useContext} from 'react'
import { valueContext } from './Context'
import axios from 'axios'
export const planContext = React.createContext();

export default function PlanCreate(props) {
  const {auth, onOff, setOnOff, token} = useContext(valueContext)
  const [title, setTitle] = useState("")
  const [place, setPlace] = useState("")
  const [startDate, setStartDate] = useState("0000-00-00")
  const [startTime, setStartTime] = useState('00:00')
  const [endDate, setEndDate] = useState("0000-00-00")
  const [endTime, setEndTime] = useState('00:00')
  const [memo, setMemo] = useState("")
  const [folder, setFolder] = useState("")
  const [error, setError] = useState([])
  const [startDateLook, setStartDateLook] = useState("0000/00/00")
  const [startTimeLook, setStartTimeLook] = useState('00:00')
  const [endDateLook, setEndDateLook] = useState("0000/00/00")
  const [endTimeLook, setEndTimelook] = useState('00:00')
  const valueSubmit = (navigation) => {
    axios
      .post("https://todoandcalendar.herokuapp.com/api/v1/plans", 
      {
        data: {
          title: title,
          place: place,
          startDate: startDate,
          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
          folder_id: folder, 
          memo: memo,
          user_id: auth.id,
        }
      },{
        headers: {
          Authorization: token
        },
      })
      .then((res) => {
        if(res.data.message){
          console.log(res.data.message);
          setError(res.data.message)
          alert("予定が登録できませんでした");
        }else{
          alert(res.data);
          setTitle("")
          setPlace("")
          setStartDate("0000-00-00")
          setStartTime('00:00')
          setStartDateLook("0000/00/00")
          setStartTimeLook('00:00')
          setEndDate("0000-00-00")
          setEndTime('00:00')
          setEndDateLook("0000/00/00")
          setEndTimelook('00:00')
          setMemo("")
          setFolder("")
          setOnOff(!onOff)
          navigation.navigate('home')
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <planContext.Provider 
      value={{title, setTitle, place, setPlace, startDate, setStartDate, startTime, setStartTime, endDate, setEndDate, endTime, setEndTime, 
      memo, setMemo, folder, setFolder, error, setError, startDateLook, setStartDateLook, startTimeLook, setStartTimeLook, endDateLook, setEndDateLook, endTimeLook, setEndTimelook, valueSubmit}}>
      {props.children}
    </planContext.Provider>
  )
}