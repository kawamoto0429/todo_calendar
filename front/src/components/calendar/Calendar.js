import React, {useContext} from 'react';
import {valueContext} from "../../context/Context"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "./Modal"

export default function Calendar() {
  const {calendars} = useContext(valueContext)
  console.log(calendars)
  const event = calendars.map((item)=>{
    return {title: item.title, start: item.start}
  })
  console.log(event)
  return (
    <div style={styles.container}>
      <div>
        <h2>カレンダー</h2>
        <div style={styles.calendar}>
        <FullCalendar plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale="ja" 
          events={
            event.map((item)=>{
              return item
            })
          }
        />
        </div>
      </div>
      <div>
        <Modal />
      </div>
    </div>
  )
}
const styles = {
  calendar:{
    width: 600,
  },
  container:{
    display: "flex",
  }
}