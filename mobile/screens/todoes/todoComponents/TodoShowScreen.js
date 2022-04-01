import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { valueContext } from '../../../context/Context';
import {TodoItem} from "../../../components/TodoItem"
import {PlanItem} from "../../../components/PlanItem"

export default function TodoShowScreen({route,  navigation }) {
  const id = route.params
  const {auth, onOff, token} = useContext(valueContext)
  const [todoes, setTodoes] = useState([])
  const [folder, setFolder] = useState([])
  console.log(auth)
  useEffect(() => {
    axios.get(`https://todoandcalendar.herokuapp.com/api/v1/folders/${id}`,{
      params:{
        user_id: auth.id
      },
      headers: {
        Authorization: token
      },
    })
    .then((response) => {
      setFolder(response.data[0])
      setTodoes(response.data[1])
    })
    .catch((error) => console.log(error));
  }, [onOff]);

  const renderTodo = ({ item }) => (
    <TodoItem item={item} navigation={navigation} />
  );
  const renderPlan = ({ item }) => (
    <PlanItem item={item} navigation={navigation} />
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.h}>
        <Text style={styles.font}>{folder.name}フォルダ</Text>
      </View>
      
      {todoes.length !== 0 && folder.format_id === 1 &&(
        <View style={styles.plans}>
        <FlatList
          data={todoes}
          renderItem={renderPlan}
          keyExtractor={item => item.id}
        />
         </View>
      )}
      {todoes.length !== 0 && folder.format_id === 2 &&(
        <View style={styles.todoes}>
        <FlatList
          data={todoes}
          renderItem={renderTodo}
          keyExtractor={item => item.id}
        />
         </View>
      )}
      {todoes.length === 0 && (
        <View style={styles.box}>
          <Text style={styles.name}>リストがありません</Text>
        </View>
      )}
  </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h :{
    margin: 15,
  },
  todoes: {
    marginHorizontal: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  plans: {
    marginHorizontal: 15,
    borderRadius: 8,
  },
  font: {
    fontSize: 20,
    fontWeight: "bold"
  },
  box: {
    backgroundColor: "#ffffff",
    padding: 12,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#f8f8ff",
    borderRadius: 8,
  },
  name:{
    fontSize: 20,
  },
  box2: {
    margin: 20,
    marginTop: 0,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
  },
  title: {
    margin: 10,
    paddingBottom: -10,
  },
  datetime: {
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    padding: 12,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#f8f8ff",
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  calendar: {
    borderBottomWidth: 1,
    height: 330,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
});