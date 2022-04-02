import LogoutButton from "../../components/LogoutButton"
import PlanCreateBtn from "../../components/PlanCreateBtn"
import PlanEditButton from "../../components/PlanEditButton"
import PlanNew from "../../components/PlanNew"
import PlanCreateScreen from "../../screens/calendars/PlanCreateScreen"
import CalendarScreen from "../../screens/calendars/CalendarScreen"
import { Stack } from "../Stack"
import PlanDetailScreen from "../../screens/todoes/planComponents/PlanDetailScreen"

export const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home"
        component={CalendarScreen}
        options={({navigation})=>({
          title: "calendar",
          headerLeft: () => (
            <LogoutButton />
          ),
          headerRight: () => (
            <PlanNew navigation={navigation} />
          ),
          headerStyle: {
            backgroundColor: "pink",
          },
          headerTitleStyle: {
            fontWeight: 'bold',
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