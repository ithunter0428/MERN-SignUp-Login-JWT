import React ,{useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


export default function Dashboard() {
    const history = useHistory();
    const [proData, setProdata] = useState({})
    const [loader, setLoader] = useState(true)

    const routeLogout = ()=>{
        localStorage.clear()
        let path = '/';
        history.push(path);
    }
    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:4001/profile',
            headers: {
                "Content-Type":"application/json",
                'access-token': localStorage.getItem("token")
              }
          }).then(function(response){
              console.log("hello")
              let result = response.data.data[0];
              console.log(result)
              setProdata(result) 
              setLoader(false)          
          }).catch((error)=>{
            alert(JSON.stringify(error.response.data.message))
        });
    },[])
    
    return (
        <div>
            <h1>Welcome to {proData.firstname}</h1>
            <button onClick={()=>history.push("/auth/profile")}>  Profile</button>
            <div className="my-3"><button onClick={routeLogout} className="btn btn-primary">Logout</button></div>
        </div>
    )
}
