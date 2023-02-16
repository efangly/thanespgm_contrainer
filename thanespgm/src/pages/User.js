/* eslint-disable */
import { FaUser } from "react-icons/fa"
import axios from "axios";
import { Container,Row,Col,Card } from 'react-bootstrap'
import { useState,useEffect } from "react";
import { Helmet } from "react-helmet";
import { getUserInfo,getUserId,getToken } from "../utils/Authorize";
import UserDatatable from '../components/UserDatatable';
import Navbar from '../components/Navbar';
import AddUserModal from '../components/AddUserModal'
import '../index.css'
import "../styles.css";

const User = ()=>{
  const [User,setUser] = useState([])
  const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_API}/userlistnoself/${getUserId()}`,
    { headers:{ authorization:`Bearer ${getToken()}` }})
    .then(response=>{
      setUser(response.data)
    })
    .catch(err=>{
      if(err.response.statusText == "Unauthorized"){
        window.location = "/login"
      }
      else{ Swal.fire('Errors',err.response.data.error,'error') }
    })
  }

  useEffect(()=>{
    fetchData()
  },[])

  return(
    <>
    <Helmet>
      <title>จัดการผู้ใช้งาน | {' '+getUserInfo().split(",",1)}</title>
    </Helmet>
    <Navbar />
    <Container style={{ padding: 5, marginTop: 5}}>
    <Row>  
      <Col md={2}>
      </Col>
      <Col md={8}>
        <Card className='bg-incard'>
          <Card.Header className='bg-cardheader text-white'>
            <Row>
              <Col md={5}>
                <h4 style={{ textAlign: 'left'}}><FaUser /> จัดการผู้ใช้งาน</h4>
              </Col>
              <Col md={7} align="right">
                <AddUserModal update={fetchData} />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <UserDatatable data={User} update={fetchData} />
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </Container>
    </>
  )
}

export default User;