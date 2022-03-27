import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Context } from './context/Context';
import AppNavigation from './navigation/AppNavigation';


export default function App() {
  return (
    <Context>
      <AppNavigation />
    </Context>
  );
}

