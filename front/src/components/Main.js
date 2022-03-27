import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import {valueContext} from "../context/Context"
import {Link} from 'react-router-dom'
import AlonePlans from "./plan/AlonePlans"

export default function Main() {
  const {folders, onOff, setOnOff, todoes, plans, auth} = useContext(valueContext)

  const deleteClick = (id) => {
    axios.delete(`http://localhost:3000/api/v1/folders/${id}`,{
      params: {
        user_id: auth.id
      }
    })
    .then((res) => {
      console.log(res.data)
      setOnOff(!onOff)
    });
  }
  return (
    <div style={styles.main}>
      <h1>リスト一覧</h1>
      <ul>
        {folders.map((item)=>{
          switch (item.format_id){
            case 1:
              return (
                <li key={item.id}>
                  <Link to={`/plan/${item.id}/show`}>
                    {item.name}
                    {item.format_id}
                  </Link>
                  <label style={styles.delete} onClick={()=>{deleteClick(item.id)}}>[x]</label>
                </li>  
              )
            case 2: 
            return (
              <li key={item.id}>
              <Link to={`/todo/${item.id}/show`}>
                {item.name}
                {item.format_id}
              </Link>
              <label style={styles.delete} onClick={()=>{deleteClick(item.id)}}>[x]</label>
              </li>
            )
            default:
              return;
          }
          
        })}
        <AlonePlans todoes={todoes} />
        
        {plans.map((item)=>{
          return (
            <li key={item.id}>{item.title}</li>
          )
        })}
      </ul>  
    </div>
  )
}

const styles = {
  main: {
    backgroundColor: "yellow",
  },
  delete: {
    color: "red",
    
  },
}