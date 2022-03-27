import React from 'react'
import SignUp from './components/user/SignUp';
import Login from "./components/user/Login"
import {Routes, Route, Navigate } from 'react-router-dom'

export default function NoLogin() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={< SignUp/>} />
        <Route
            path="*"
            element={<Navigate to="/login" />}
        />
      </Routes>
    </>
  )
}
