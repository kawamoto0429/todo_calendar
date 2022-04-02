import { CalendarStack } from "./stacks/Calendar";
import { FontAwesome } from '@expo/vector-icons';
import { TodoStack } from "./stacks/Todo";
import { Tab } from "./Tab";

export const OnAuth = () => {
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
  return(
    <Tab.Navigator screenOptions={screenOption}>
      <Tab.Screen name="Todo" options={{headerShown: false}} component={TodoStack} />
      <Tab.Screen name="Calendar" options={{headerShown: false}} component={CalendarStack} />
    </Tab.Navigator>
  )
}