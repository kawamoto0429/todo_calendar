import React, {useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { valueContext } from '../context/Context';
import { OffAuth } from './stacks/OffAuth';
import { OnAuth } from './OnAuth';
import Loading from '../components/Loading';
import { loadingContext } from '../context/LoadingContext';

const AppNavigation = () => {
  const {auth} = useContext(valueContext);
  const {loading, setLoading} = useContext(loadingContext)
  return (
    <NavigationContainer>
        {auth?(
            <OnAuth />
          ):(
            <OffAuth />
        )}
      { loading || <Loading />}
    </NavigationContainer>
  )
}

export default AppNavigation