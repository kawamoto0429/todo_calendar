import React, {useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { valueContext } from '../context/Context';
import { OffAuth } from './stacks/OffAuth';
import { OnAuth } from './OnAuth';

const AppNavigation = () => {
  const {auth} = useContext(valueContext);
  return (
    <NavigationContainer>
      {auth?(
          <OnAuth />
        ):(
          <OffAuth />
      )}
    </NavigationContainer>
  )
}

export default AppNavigation