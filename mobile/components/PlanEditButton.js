import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { valueContext } from '../context/Context'
import axios from "axios"

export default function PlanEditButton({id}) {
  const {auth, memo1} = useContext(valueContext)
  const [plan, setPlan] = useState([])
  useEffect(()=>{
    axios.get(`http://localhost:3000/api/v1/plans/${id}`, {
      params:{
        user_id: auth.id
      }
    })
    .then((res)=>{
      setPlan(res.data)
    })
    .catch((error) => console.log(error));
  }, [])
  const valueSubmit = (id) => {
    axios.patch(`http://localhost:3000/api/v1/plans/${id}`, {
      data: {
        title: plan.title,
        place: plan.place,
        startDate: plan.startDate,
        startTime: plan.startTime,
        endDate: plan.endDate,
        endTime: plan.endTime,
        folder_id: plan.folder_id, 
        memo: memo1,
        user_id: auth.id
      },
    })
    .then((res) => {
      alert(res.data)
    })
    .catch((error) => {
      alert(error);
    });
  }
  return (
    <TouchableOpacity onPress={()=>valueSubmit(id)}>
      <Text style={styles.font}>Edit</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  font:{
    marginRight: 25,
    color: "#00bfff",
    fontSize: 16,
    fontWeight: "bold",
  
  }
});