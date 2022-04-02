import AuthScreen from "../../screens/auths/AuthScreen"
import UserCreateScreen from "../../screens/auths/UserCreateScreen"
import { Stack } from "../Stack"

export const OffAuth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login"
      component={AuthScreen}
      />
      <Stack.Screen name="SignUp"
      component={UserCreateScreen}
      />
    </Stack.Navigator>
  ) 
}