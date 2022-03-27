import React from 'react'

export function Todoes({t, index, listClick, deleteClick, complete}) {
  return (
    <div key={t.id} style={styles.list} onClick={()=>listClick(index)}>
      <div style={styles.content}>{t.content}</div>
      <div style={styles.btn}>
        {t.complete? (
          <div style={styles.ok2} onClick={()=>complete(t.id)}>解除</div>
        ):(
          <div style={styles.ok1} onClick={()=>complete(t.id)}>完了</div>
        )}
        <div onClick={()=>{deleteClick(t.id)}} style={styles.delete}>
          削除
        </div>
      </div>
    </div>
  )
}

const styles = {
  list:{
    height: 50,
    background: "white",
    listStyle: "none",
    display: "flex",
    border: "solid",
  },
  content:{
    textAlign: "center",
    padding: 10,
    
  },
  btn: {
    marginLeft: "auto",
    display: "flex",
  },
  ok1: {
    width: 50,
    background: "green",
    textAlign: "center",
    paddingTop: 10,
    paddingButtom: 10,
    textDecoration: "lineThrough",
  },
  ok2: {
    width: 50,
    background: "green",
    textAlign: "center",
    paddingTop: 10,
    paddingButtom: 10,
    
  },
  delete :{
    width: 50,
    background: "red",
    textAlign: "center",
    paddingTop: 10,
    paddingButtom: 10,
  }
}
