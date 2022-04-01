import { View, Text } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import PlanMemo from './PlanMemo'
import { valueContext } from '../../../context/Context'

export default function PlanDetailScreen({route}) {
  const {token} = useContext(valueContext)
  const id = route.params
  const [plan, setPlan] = useState([])
  useEffect(()=>{
    axios.get(`https://todoandcalendar.herokuapp.com/api/v1/plans/${id}`, {
      headers: {
        Authorization: token
      },
    })
    .then((res)=>{
      console.log(res.data)
      setPlan(res.data)
    })
    .catch((error) => console.log(error));
  }, [])
  return (
    <View>
      {
        <PlanMemo item={plan} />
      }
    </View>
  )
}