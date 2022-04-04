import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import { valueContext } from '../../../context/Context'
import { TodoItem } from '../../../components/todoes/TodoItem';

export default function AllTodoScreen({navigation}) {
  const {todoes} = useContext(valueContext)
  console.log(todoes)
 
  const renderItem = ({ item }) => (
    <TodoItem item={item} navigation={navigation}/>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.h}>
        <Text style={styles.font}>メモ</Text>
      </View>
      <View style={styles.todoes}>
      <FlatList
        data={todoes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </View>
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
  box: {
    backgroundColor: "#ffffff",
    padding: 12,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#f8f8ff",
    borderRadius: 8,
  },
  memoh:{
    marginLeft: 15,
    marginTop: 20,
  },
  name:{
    fontSize: 20,
  },
  todoes: {
    marginHorizontal: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  font: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
