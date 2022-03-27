import React from 'react'

export default function PlanDetail({item}) {
  return (
    <div>
      {item.map((i) => {
        return(
          <>
            <div><label>title:</label>{i.title}</div>
            <div><label>place:</label>{i.place}</div>
            <div><label>start:</label>{i.start}</div>
            <div><label>end:</label>{i.end}</div>
            <div><label>memo:</label>{i.memo}</div>
          </>
        )
      })}
    </div>
  )
}
