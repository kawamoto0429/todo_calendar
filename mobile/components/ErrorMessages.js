import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ErrorMessages({error}) {
    const item = error.map((message, index)=>{
      return(
        <Text key={index} style={styles.error}>※{message}</Text>
      )
    })
    return(
      <View style={styles.errorBox}>
        {error.length !== 0 && item}
      </View>
    )
}

const styles = StyleSheet.create({
  errorBox:{
    marginLeft:20,
  },
  error:{
    fontSize: 15,
    color: "#ff7676",
  }
});