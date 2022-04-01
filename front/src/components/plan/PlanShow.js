import React, {useState, useEffect, useContext} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Plans from "./Plans"
import axios from 'axios';
import PlanDetail from './PlanDetail';
import { valueContext } from '../../context/Context';

export default function PlanShow() {
  const {auth, token} = useContext(valueContext)
  const navigation = useNavigate();
  const params = useParams();
  const id = params.id;
  const [folder, setFolder] = useState(null);
  const [plans, setPlans] = useState([]);
  const [detail, setDetail] = useState(0)
  const [onOff, setOnOff] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/folders/${id}`, {
      // headers: {
      //   Authorization: token,
      // },
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
      setPlans(response.data[1])
    })
    .catch((error) => navigation("/"));
  }, [onOff]);

  const deleteClick = (item) => {
    axios
    .delete(`http://localhost:3000/api/v1/plans/${item}`, {
      headers: {
        Authorization: token,
      },
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

  const item = plans.filter((i, index)=>{return index === detail})

  return (
    <div style={styles.container}>
      <div>
        {folder === null? (
          <div>ちょっと待ってね</div>
        ) : (
          <h1>{folder.name}</h1>
        )}
        <div style={styles.ul}>
          {plans.length === 0? (
            <div>予定がありません</div>
          ):(
            plans.map((t, index)=>{
              return (
                <Plans 
                  t={t} 
                  index={index}
                  listClick={listClick}
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
          {<PlanDetail item={item}/>}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container:{
    display: "flex",
  },
  ul:{
    width: 400,
  },
}
