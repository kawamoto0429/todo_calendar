import React, {useState, useEffect, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {TodoDetail} from "./TodoDetail"
import {Todoes} from "./Todoes"
import axios from 'axios';
import { valueContext } from "../../context/Context";

export default function TodoShow() {
  const {auth} = useContext(valueContext)
  const params = useParams();
  const id = params.id;
  const navigation = useNavigate();
  const [folder, setFolder] = useState(null);
  const [todoes, setTodoes] = useState([]);
  const [detail, setDetail] = useState(0)
  const [onOff, setOnOff] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/folders/${id}`, {
      params:{
        user_id: auth.id
      }
    })
    .then((response) => {
      if(response.data === "error"){
        return navigation("/")
      }
      console.log(response.data)
      setFolder(response.data[0])
      setTodoes(response.data[1])
    })
    .catch((error) => navigation("/"));
  }, [onOff]);

  const deleteClick = (item) => {
    axios
    .delete(`http://localhost:3000/api/v1/todoes/${item}`, {
      params: {
        user_id: auth.id
      }
    })
    .then((res) => {
      console.log(res.data)
      setOnOff(!onOff)
    });
  }

  const listClick = (id) => {
    setDetail(prev => id)
  }

  const complete = (id) => {
    axios
    .get(`http://localhost:3000/api/v1/todoes/${id}/complete`, {
      params: {
        user_id: auth.id
      }
    })
    .then((res) => {
      if(res.data === "error"){
        return navigation("/")
      }
      console.log(res.data)
      setOnOff(!onOff)
    } );
  }

  const item = todoes.filter((i, index)=>{return index === detail})

  return (
    <div style={styles.container}>
      <div>
        {folder === null? (
          <div>ちょっと待ってね</div>
        ) : (
          <h1>{folder.name}</h1>
        )}
        <div style={styles.ul}>
          {todoes.length === 0? (
            <div>todoがありません</div>
          ):(
            todoes.map((t, index)=>{
              return (
                <Todoes 
                  t={t} 
                  index={index}
                  listClick={listClick}
                  complete={complete}
                  deleteClick={deleteClick}
                />
              )
            })
          )}
        </div>
      </div>
      <div>
        <h2>詳細</h2>
        <div>
          {<TodoDetail item={item}/>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container:{
    display: "flex",
  },
  ul:{
    width: 400,
    // border: "solid",
  },
}
