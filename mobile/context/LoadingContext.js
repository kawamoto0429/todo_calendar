import React, {useState, useEffect} from 'react'
export const loadingContext = React.createContext();

export default function LoadingContext(props) {
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    i()
  }, [])
  
  const i = () => {setTimeout(() => {
    setLoading(true)
  }, 2000)};
  return (
    <loadingContext.Provider value={{loading, setLoading}}>
      {props.children}
    </loadingContext.Provider>
  )
}