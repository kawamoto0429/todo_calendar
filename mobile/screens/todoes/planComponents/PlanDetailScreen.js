import { View, Text } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import PlanMemo from './PlanMemo'
import { valueContext } from '../../../context/Context'
import { heroku } from '../../../customHooks/Heroku'

export default function PlanDetailScreen({route}) {
  const {token} = useContext(valueContext)
  const id = route.params
  const [plan, setPlan] = useState([])
  useEffect(()=>{
    axios.get(`${heroku}/api/v1/plans/${id}`, {
      headers: {
        Authorization: token
      },
    })
    .then((res)=>{
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