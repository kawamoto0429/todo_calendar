
import React, {useContext} from "react"
import {Routes, Route, Navigate } from 'react-router-dom'
import NoLogin from "./NoLogin";
import {valueContext} from "./context/Context"
import Default from "./Default"


function App() {
  const {auth, setAuth} = useContext(valueContext);
  return (
    <div >
      <Routes>
        {
          auth?(
            <>
              <Route
                  path="*"
                  element={<Default />}
              />
            </>
          ):(
            <>
              <Route
                  path="*"
                  element={<NoLogin />}
              />
            </>
          )
        }
      </Routes>
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 5fr",
    height: "800px",
  },
  sidebar: {
    gridArea: "b",
  },
  main: {
    gridArea: "a",
  }
}

export default App;
