import React from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import Main from "./components/Main"
import Sidebar from './components/Sidebar'
import Calendar from "./components/calendar/Calendar"
import Todo from "./components/todo/Todo"
import Plan from "./components/plan/Plan"
import Folder from "./components/Folder"
import TodoShow from "./components/todo/TodoShow";
import PlanShow from "./components/plan/PlanShow"
import Logout from "./components/Logout"

export default function Default() {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div>
      <Logout />  
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
            path="*"
            element={<Navigate to="/" />}  
        />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/todo/create" element={<Todo />} />
        <Route path="/plan/create" element={<Plan/>} />
        <Route path="/folder/create" element={<Folder/>} />
        <Route path="/todo/:id/show" element={<TodoShow />}/>
        <Route path="/plan/:id/show" element={<PlanShow />} />
      </Routes>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 5fr",
    height: "800px",
  },
  sidebar: {
    gridArea: "b",
  },
  main: {
    gridArea: "a",
  }
}