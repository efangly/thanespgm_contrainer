/* eslint-disable */
import { BsFillPinMapFill } from "react-icons/bs"
import { Container,Row,Col,Card } from 'react-bootstrap'
import { useState } from "react";
import { Helmet } from "react-helmet";
import '../index.css'
import LocDatatable from '../components/LocationDatatable'
import AddLocationModal from "../components/AddLocationModal";
import Navbar from '../components/Navbar'
import { getUserInfo } from "../utils/Authorize"

const Location = ()=>{
  const [addlocal,setAddlocal] = useState(false)
  const updateDataTable =(params)=>{
    setAddlocal(params)
  }

  return(
    <>
    <Helmet>
      <title>จัดการสถานที่ปฏิบัติงาน | {' '+getUserInfo().split(",",1)}</title>
    </Helmet>
    <Navbar />
    <Container style={{ padding: 5, marginTop: 5}}>
    <Row>  
      <Col sm={2}>
      </Col>
      <Col sm={8}>
        <Card className='bg-incard'>
          <Card.Header className='bg-cardheader text-white'>
            <Row>
              <Col sm={5}>
                <h4 style={{ textAlign: 'left'}}><BsFillPinMapFill /> จัดการสถานที่ปฏิบัติงาน</h4>
              </Col>
              <Col sm={7} align="right">
                <AddLocationModal updateadd={updateDataTable} />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <LocDatatable refresh={addlocal} updaterefresh={updateDataTable} />
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </Container>
    </>
  )
}

export default Location;