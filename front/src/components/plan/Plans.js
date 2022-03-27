import React from 'react'

export default function Plans({t, index, listClick, deleteClick}) {
  return (
    <div key={t.id} style={styles.list} onClick={()=>listClick(index)}>
      <div style={styles.title}>{t.title}</div>
      <div style={styles.btn}>
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
  title:{
    textAlign: "center",
    padding: 10,
    
  },
  btn: {
    marginLeft: "auto",
    display: "flex",
  },
  delete :{
    width: 50,
    background: "red",
    textAlign: "center",
    paddingTop: 10,
    paddingButtom: 10,
  }
}

