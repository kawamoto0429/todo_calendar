import FolderCreateBtn from "../../components/FolderCreateBtn"
import FolderNew from "../../components/FolderNew"
import PlanEditButton from "../../components/PlanEditButton"
import TodoCreateBtn from "../../components/TodoCreateBtn"
import TodoEditButton from "../../components/TodoEditButton"
import TodoNew from "../../components/TodoNew"
import FolderCreateScreen from "../../screens/folders/FolderCreateScreen"
import AllPlanScreen from "../../screens/todoes/planComponents/AllPlanScreen"
import PlanDetailScreen from "../../screens/todoes/planComponents/PlanDetailScreen"
import AllTodoScreen from "../../screens/todoes/todoComponents/AllTodoScreen"
import TodoCreateScreen from "../../screens/todoes/todoComponents/TodoCreateScreen"
import TodoDetailScreen from "../../screens/todoes/todoComponents/TodoDetailScreen"
import TodoShowScreen from "../../screens/todoes/todoComponents/TodoShowScreen"
import TodoScreen from "../../screens/todoes/TodoScreen"
import { Stack } from "../Stack"

export const TodoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="home" 
        component={TodoScreen} 
        options={({navigation})=>({
          title: "TODO",
          headerLeft: () => (
            <TodoNew navigation={navigation}  />
          ),
          headerRight: () => (
            <FolderNew navigation={navigation}  />
          ),
          headerStyle: {
            backgroundColor: "gold",
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
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
        options={({navigation})=>({
          title: "TODO作成",
          headerRight: () => (
            <TodoCreateBtn navigation={navigation}/>
          ),
        })}
      />
      <Stack.Screen 
        name="FolderCreate" 
        component={FolderCreateScreen} 
        options={({navigation})=>({
          title: "フォルダ作成",
          headerRight: () => (
            <FolderCreateBtn navigation={navigation} />
          ),
        })}
      />
    </Stack.Navigator>
  )
}
