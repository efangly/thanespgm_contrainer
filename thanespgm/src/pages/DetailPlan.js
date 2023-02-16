/* eslint-disable */
import { useState } from "react";
import { BsFillGearFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa"
import { Container,Row,Col,Card,Button } from 'react-bootstrap'
import { getToken,getUserInfo } from "../utils/Authorize"
import { Helmet } from "react-helmet"
import axios from "axios";
import Swal from "sweetalert2";
import DetailPlanDatatable from '../components/DetailPlanDatatable';
import Navbar from '../components/Navbar';
import { DeleteSwal } from "../utils/Swal";
import '../index.css'

const DetailPlan = (props)=>{
  const [selectedRows,setSelectedRows] = useState([])
  const [updateStatus,setUpdateStatus] = useState(false)
  const updateSelectRows=(params)=>{
    setSelectedRows(params)
  }
  const deleteStatus =(params)=>{
    setUpdateStatus(params)
  }
  const deleteDtPlan=()=>{
    if(selectedRows.length === 0){
      Swal.fire({icon: 'warning',text: 'โปรดเลือกอย่างน้อย 1 รายการ'})}
    else{
      DeleteSwal().then((result) => {
        if(result.isConfirmed){
          let DTplanidlist = []
          for(let i = 0; i < selectedRows.length; i++) {
            DTplanidlist.push(selectedRows[i].detailID)
          }
          axios.delete(`${process.env.REACT_APP_API}/removedtplan/${DTplanidlist}`,
          { headers:{authorization:`Bearer ${getToken()}`}
          }).then(response=>{
            deleteStatus(true)
            setSelectedRows([])
            Toast.fire({icon: 'success',title: 'ลบรายการสำเร็จ'})
          }).catch(err=>{
            if(err.response.statusText == "Unauthorized"){ window.location = "/login" }
            else{ Swal.fire('Errors',err.response.data.error,'error') }
          })
        }
      })  
    }
  }
  return(
    <>
    <Helmet>
      <title>แก้ไข | {' '+getUserInfo().split(",",1)}</title>
    </Helmet>
    <Navbar />
    <Container style={{ padding: 5, marginTop: 5}}>
      <Card className='bg-incard'>
        <Card.Header className='bg-cardheader text-white'>
          <Row>
            <Col sm={6}>
              <h4 style={{ textAlign: 'left'}}><BsFillGearFill /> รายงาน | แก้ไข</h4>
            </Col>
            <Col sm={6} align="right">
              <Button variant="outline-danger" onClick={deleteDtPlan} ><FaTrashAlt /> ลบรายการที่เลือก</Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <DetailPlanDatatable 
              planID={props.match.params.planID} 
              selecterow={updateSelectRows} 
              refresh={updateStatus} 
              returnstatus={deleteStatus}
            />
          </Row>
        </Card.Body>
      </Card>
    </Container>
    </>
  )
}

export default DetailPlan