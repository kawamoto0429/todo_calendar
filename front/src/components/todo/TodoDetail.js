import React from 'react'

export function TodoDetail({item}) {
  return (
    item.map((item)=>{
      if(item.memo === null) {
        return (
          <div>メモされていません</div>
        )
      }else{
        return(
          <div>{item.memo}</div>
        )
      }
    })
  )
}
