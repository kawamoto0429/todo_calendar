import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h1>メニュー</h1>
      <ul style={styles.ul}>
        <li><Link to="/folder/create">フォルダー追加</Link></li>
        <li><Link to="/plan/create">予定追加</Link></li>
        <li><Link to="/todo/create">todo追加</Link></li>
        <li><Link to="/calendar">カレンダー</Link></li>
        <li><Link to="/">リスト一覧</Link></li>
      </ul>
    </div>
  )
}

const styles = {
  sidebar: {
    backgroundColor: "red",
    textAlign: "center",
  },
  ul: {
    textAlign: "left",
  }
}
