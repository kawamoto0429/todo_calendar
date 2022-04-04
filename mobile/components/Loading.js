import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>ちょっと待ってね</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height:"100%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    alignItems: "center",
    justifyContent: "center",
  }
})