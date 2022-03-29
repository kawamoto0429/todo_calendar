import { Context } from './context/Context';
import FolderCreate from './context/FolderCreate';
import PlanCreate from './context/PlanCreate';
import TodoCreate from './context/TodoCreate';
import AppNavigation from './navigation/AppNavigation';


export default function App() {
  return (
    <Context>
      <FolderCreate>
      <TodoCreate>
      <PlanCreate>
      <AppNavigation />
      </PlanCreate>  
      </TodoCreate>
      </FolderCreate>
    </Context>
  );
}

