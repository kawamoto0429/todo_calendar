import React, {useContext} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { valueContext } from '../context/Context';
import TodoScreen from '../screens/todoes/TodoScreen';
import CalendarScreen from '../screens/calendars/CalendarScreen';
import TodoShowScreen from '../screens/todoes/todoComponents/TodoShowScreen';
import TodoCreateScreen from '../screens/todoes/todoComponents/TodoCreateScreen';
import FolderCreateScreen from '../screens/folders/FolderCreateScreen';
import PlanCreateScreen from '../screens/calendars/PlanCreateScreen';
import AuthScreen from '../screens/auths/AuthScreen';
import UserCreateScreen from '../screens/auths/UserCreateScreen';
import AllTodoScreen from '../screens/todoes/todoComponents/AllTodoScreen';
import AllPlanScreen from '../screens/todoes/planComponents/AllPlanScreen';
import TodoDetailScreen from '../screens/todoes/todoComponents/TodoDetailScreen';
import PlanDetailScreen from '../screens/todoes/planComponents/PlanDetailScreen';
import TodoEditButton from '../components/TodoEditButton';
import PlanEditButton from '../components/PlanEditButton';
 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TodoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="home" 
        component={TodoScreen} 
        options={{
          headerShown: false,
          title: "Todo"
        }}
      />
      <Stack.Screen 
        name="show" 
        component={TodoShowScreen} 
        options={{
          title: "フォルダ詳細"
        }}
      />
      <Stack.Screen 
        name="allTodo" 
        component={AllTodoScreen} 
        options={{
          title: "メモ一覧"
        }}
      />
      <Stack.Screen 
        name="allPlan" 
        component={AllPlanScreen} 
        options={{
          title: "予定一覧"
        }}
      />
      <Stack.Screen 
        name="todoDetail" 
        component={TodoDetailScreen} 
        options={({route})=>({
          title: "メモ書き",
          headerRight: () => (
            <TodoEditButton id={route.params}/>
          ),
        })}
      />
      <Stack.Screen 
        name="planDetail" 
        component={PlanDetailScreen} 
        options={({route})=>({
          title: "メモ書き",
          headerRight: () => (
            <PlanEditButton id={route.params}/>
          ),
        })}
      />
      <Stack.Screen 
        name="TodoCreate" 
        component={TodoCreateScreen} 
        options={({route})=>({
          title: "",
        })}
      />
      <Stack.Screen 
        name="FolderCreate" 
        component={FolderCreateScreen} 
        options={({route})=>({
          title: "",
        })}
      />
    </Stack.Navigator>
  )
}

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home"
       component={CalendarScreen}
       options={{headerShown: false}}
      />
      <Stack.Screen name="planCreate"
       component={PlanCreateScreen}
       options={({route})=>({
        title: "",
      })}
      />
      <Stack.Screen 
        name="planDetail" 
        component={PlanDetailScreen} 
        options={({route})=>({
          title: "メモ書き",
          headerRight: () => (
            <PlanEditButton id={route.params}/>
          ),
        })}
      />
    </Stack.Navigator>
  )
}

const screenOption = ({route}) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;
    if (route.name === 'Todo') {
      iconName = "list-alt"
    } else if (route.name === 'Calendar') {
      iconName = "calendar"
    }
    return <FontAwesome name={iconName} size={size} color={color} />;
  }
})

const AppNavigation = () => {
  const {auth} = useContext(valueContext);
  return (
    <NavigationContainer>
      {auth?(
        <Tab.Navigator screenOptions={screenOption}>
          <Tab.Screen name="Todo" options={{headerShown: false}} component={TodoStack} />
          <Tab.Screen name="Calendar" options={{headerShown: false}} component={CalendarStack} />
        </Tab.Navigator>
        ):(
          <Stack.Navigator>
            <Stack.Screen name="Login"
            component={AuthScreen}
            />
            <Stack.Screen name="SignUp"
            component={UserCreateScreen}
            />
          </Stack.Navigator>
      )}
      
    </NavigationContainer>
  )
}

export default AppNavigation