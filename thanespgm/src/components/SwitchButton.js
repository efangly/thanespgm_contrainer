/* eslint-disable */
import { FaSyncAlt,FaUser } from "react-icons/fa"
import { Dropdown } from 'react-bootstrap'
import { useState,useEffect } from "react"
import Swal from "sweetalert2"
import axios from "axios"
import '../index.css'
import { getToken,getAdmin,getUserId,getStatus } from "../utils/Authorize"

const SwitchButton = (props)=>{
  const [user,setUser] = useState([])
  const [userName,setUserName] = useState('')
  const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_API}/user`,
    { headers:{ authorization:`Bearer ${getToken()}` }}
    ).then(response=>{
      setUser(response.data) 
    }).catch(err=>{
      if(err.response.statusText == "Unauthorized"){ window.location = "/login" }
      else{ Swal.fire('Errors',err.response.data.error,'error') } 
    })
  }
  const changeUser=(userid)=>{
    axios.get(`${process.env.REACT_APP_API}/user/${userid}`,
    { headers:{ authorization:`Bearer ${getToken()}` }}
    ).then(response=>{
      const userinfo = JSON.stringify(response.data.userID+","+response.data.firstname+","+response.data.lastname+","+response.data.job+","+response.data.department)
      localStorage.setItem("userInfo_Admin",userinfo)
      setUserName(`${response.data.firstname}  ${response.data.lastname}`)
      props.update()
    }).catch(err=>{
      if(err.response.statusText == "Unauthorized"){ window.location = "/login" }
      else{ Swal.fire('Errors',err.response.data.error,'error') } 
    })
  }
  useEffect(()=>{
    if(getStatus() === "admin"){
      changeUser(getAdmin().split(",",1)) 
    }else{
      changeUser(getUserId())
    }
    fetchData()
  },[])
  return(
    <div className="d-flex flex-row gap-2">
      <h4 style={{ textAlign: 'left'}}><FaUser size={24} /> {userName}</h4>
      <Dropdown onSelect={(k) => changeUser(k)} className={`${getStatus() === "admin" ? "d-block" : "d-none"}`}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
          <FaSyncAlt /> สลับผู้ใช้งาน
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {user.map((user,index)=>(
            <Dropdown.Item eventKey={user.userID}>{`${index+1}. ${user.firstname} ${user.lastname}`}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default SwitchButton