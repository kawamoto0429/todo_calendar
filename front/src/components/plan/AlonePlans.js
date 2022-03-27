import React from 'react'

export default function AlonePlans({todoes}) {
  return(
    <>
    {todoes.map((item)=>{
      return (
        <li key={item.id}>{item.content}</li>
      )
    })}
    </>
  )
  
}
