import { Context } from './context/Context';
import FolderCreate from './context/FolderCreate';
import LoadingContext from './context/LoadingContext';
import PlanCreate from './context/PlanCreate';
import TodoCreate from './context/TodoCreate';
import AppNavigation from './navigation/AppNavigation';


export default function App() {
  return (
    <Context>
      <LoadingContext>
      <FolderCreate>
      <TodoCreate>
      <PlanCreate>
      <AppNavigation />
      </PlanCreate>  
      </TodoCreate>
      </FolderCreate>
      </LoadingContext>
    </Context>
  );
}

