import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, {useContext} from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { valueContext } from '../../../context/Context';
import { PlanItem } from '../../../components/plans/PlanItem';

export default function AllPlanScreen({navigation}) {
  const {plans} = useContext(valueContext)
  
  const renderItem = ({ item }) => (
    <PlanItem item={item} navigation={navigation} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.h}>
        <Text style={styles.font}>予定</Text>
      </View>
      <View style={styles.plans}>
        <FlatList
          data={plans}
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
  font: {
    fontSize: 20,
    fontWeight: "bold"
  },
  plans: {
    marginHorizontal: 15,
    borderRadius: 8,
  },
  box: {
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
    // marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: "#f8f8ff",
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  name:{
    fontSize: 30,
  },
});