import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export const DeleteButton = ({id, deleteClick}) =>  {
  return (
    <TouchableOpacity onPress={()=>deleteClick(id)}>
      <View style={styles.delete}>
        <Text style={styles.swipeFont}>削除</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  delete: {
    alignItems: 'center',
    backgroundColor: "#ffffff",
    padding: 17,
    borderRadius: 100,
    backgroundColor: "red",
  },
  swipeFont:{
    fontSize: 12,
    fontWeight: "bold"
  },
});