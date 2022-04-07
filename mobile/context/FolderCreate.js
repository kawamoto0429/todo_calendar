import React, {useState, useContext} from 'react'
import { valueContext } from './Context'
import axios from 'axios'
import { heroku } from '../customHooks/Heroku';
export const folderContext = React.createContext();

export default function FolderCreate(props) {
  const {onOff, setOnOff, auth, token} = useContext(valueContext)
  const [folder, setFolder] = useState("")
  const [format, setFormat] = useState("")
  const [error, setError] = useState([])
  const valueSubmit = (navigation) => {
    axios
      .post(`${heroku}/api/v1/folders`, {
        data: {name: folder, format: format, user_id: auth.id},
      }, {
        headers: {
          Authorization: token
        },
      })
      .then((res) => {
        if (res.data.message) {
          console.log(res.data.message)
          setError(res.data.message)
          alert("フォルダーが制作できませんでした")
        }else{
          alert(res.data);
          setFolder("")
          navigation.navigate('home')
          setError([])
          setOnOff(!onOff)
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
  
  return (
    <folderContext.Provider value={{folder, setFolder, format, setFormat, error, setError, valueSubmit}}>
      {props.children}
    </folderContext.Provider>
  )
}