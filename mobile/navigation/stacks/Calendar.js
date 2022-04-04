import LogoutButton from "../../components/LogoutButton"
import PlanCreateBtn from "../../components/plans/PlanCreateBtn"
import PlanEditButton from "../../components/plans/PlanEditButton"
import PlanNew from "../../components/plans/PlanNew"
import PlanCreateScreen from "../../screens/calendars/PlanCreateScreen"
import CalendarScreen from "../../screens/calendars/CalendarScreen"
import { Stack } from "../Stack"
import PlanDetailScreen from "../../screens/todoes/planComponents/PlanDetailScreen"
import FolderNew from "../../components/folders/FolderNew"
import FolderCreateBtn from "../../components/folders/FolderCreateBtn"
import FolderCreateScreen from "../../screens/folders/FolderCreateScreen"

export const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="home"
        component={CalendarScreen}
        options={({navigation})=>({
          title: "calendar",
          headerLeft: () => (
            <PlanNew navigation={navigation} />
          ),
          headerRight: () => (
            <FolderNew navigation={navigation} />
            // <LogoutButton />
          ),
          headerStyle: {
            backgroundColor: "pink",
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign:"center", 
          },
        })}
      />
      <Stack.Screen name="planCreate"
       component={PlanCreateScreen}
       options={({navigation})=>({
        title: "予定作成",
        headerRight: () => (
          <PlanCreateBtn navigation={navigation} />
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