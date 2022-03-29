import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import React, {useContext} from 'react'
import TodoHeader from '../../navigation/TodoHeader'
import { valueContext } from '../../context/Context'
import Swipeout from 'react-native-swipeout';
import axios from 'axios';

const TodoScreen = ({ navigation }) => {
  const {folders, auth, onOff,setOnOff} = useContext(valueContext)
  const deleteClick = (id) => {
    axios.delete(`https://todoandcalendar.herokuapp.com/api/v1/folders/${id}`,{
      params: {
        user_id: auth.id
      }
    })
    .then((res) => {
      console.log(res.data)
      setOnOff(!onOff)
    });
  }
  
  const Item = ({name, id}) =>{
    const swipeoutRight = [
      {
        backgroundColor: "#f5f5f5",
        component:(
          <TouchableOpacity onPress={()=>deleteClick(id)}>
            <View style={styles.delete}>
              <Text style={styles.swipeFont}>削除</Text>
            </View>
          </TouchableOpacity>
        )
      }
    ]

    return (
      <Swipeout
        style={{backgroundColor: "#f5f5f5"}}
        right={swipeoutRight}
       >
        <TouchableOpacity onPress={()=>navigation.navigate('show', id)}>
            <View style={styles.box}>
              <Text style={styles.name}>{name}</Text>
            </View>
        </TouchableOpacity>
      </Swipeout>
    )
  }
  const renderItem = ({ item }) => (
    <Item name={item.name} id={item.id} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TodoHeader navigation={navigation}/>
      <View style={styles.memoh}>
        <Text style={styles.font}>メモ</Text>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('allTodo')}>
        <View style={styles.memo}>
          <Text>メモ</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.planh}>
        <Text style={styles.font}>予定</Text>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('allPlan')}>
        <View style={styles.memo}>
          <Text>予定</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.folderh}>
        <Text style={styles.font}>フォルダ一覧</Text>
      </View>
      <FlatList
        data={folders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memo:{
    margin: 15,
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
  },  
  box: {
    marginHorizontal: 15,
    marginBottom: 8,
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
  },
  memoh:{
    marginLeft: 15,
    marginTop: 20,
  },
  planh:{
    marginLeft: 15,
    marginTop: 10,
  },
  name:{
    fontSize: 20,
  },
  folderh:{
    margin: 15,
  },
  font: {
    fontSize: 20,
    fontWeight: "bold"
  },
  delete: {
    marginRight: 25,
    marginBottom: 8,
    backgroundColor: "#ffffff",
    padding: 17,
    borderRadius: 100,
    backgroundColor: "red",
  },
  swipeFont:{
    fontSize: 10,
  },
});

export default TodoScreen