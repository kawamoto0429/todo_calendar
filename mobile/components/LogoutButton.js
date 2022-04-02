import {TouchableOpacity, Text } from 'react-native'
import React, {useContext} from 'react'
import { valueContext } from '../context/Context'

export default function LogoutButton() {
  const {reItem} = useContext(valueContext)
  const logout = () => {
    reItem()
  }
  return (
    <TouchableOpacity onPress={()=>logout()}>
      <Text>logout</Text>
    </TouchableOpacity>
  )
}