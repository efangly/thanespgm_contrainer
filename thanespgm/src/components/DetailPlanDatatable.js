/* eslint-disable */
import DataTable from 'react-data-table-component';
import axios from "axios";
import Swal from "sweetalert2";
import { useState,useEffect,useCallback } from "react";
import { Button,Modal,Form,Row,Col,Spinner } from 'react-bootstrap';
import { FaRegEdit } from "react-icons/fa";
import { getToken} from "../utils/Authorize";
import { DetailPlanDataTablecolumn } from '../utils/Columns';
import { Toast } from '../utils/Swal';
import "../styles.css";

const DetailPlanDatatable = (props)=>{
  const columns = DetailPlanDataTablecolumn()
  columns.push({
    name: "แก้ไข",
    cell: row => (
      <Button variant="outline-info" raised primary onClick={()=>{handleShow(row.detailID)}} > 
        <FaRegEdit />
      </Button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    maxWidth: "20px",
    center: true
  })
  const [isLoading, setLoading] = useState(false)
  const [DtPlan,setDtPlan] = useState([])
  const [editplan,setEditplan] = useState({detailID:"",travel_money: 0,hotel_money: 0,other_money: 0,location:"",objective:"",buddy:""})
  const {detailID,travel_money,hotel_money,other_money,location,objective,buddy} = editplan
  const [show, setShow] = useState(false)
  //row.detailID
  const inputValue = name=>event=>{
    setEditplan({...editplan,[name]:event.target.value});
  }
  useEffect(()=>{
    fetchData()
  },[props.refresh])
  const handleChange = useCallback(state => {
    props.selecterow(state.selectedRows)
	},[])
  const handleClose = () =>{
    setShow(false);
  }
  const handleShow = (DtplanID) =>{
    axios.get(`${process.env.REACT_APP_API}/dtplanlist/${DtplanID}`,
    { headers:{authorization:`Bearer ${getToken()}`} }
    ).then(response=>{
      const {detailID,travel_money,hotel_money,other_money,location,objective,buddy} = response.data
      setEditplan({...editplan,detailID,travel_money,hotel_money,other_money,location,objective,buddy})
      setShow(true)}
    ).catch(err=>{
      if(err.response.statusText == "Unauthorized"){ window.location = "/login" }
      else{ Swal.fire('Errors','ทำรายการไม่สำเร็จ','error') }
    })
  } 

  const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_API}/dtplanlistbyplan/${props.planID}`,
    { headers:{ authorization:`Bearer ${getToken()}`} }
    ).then(response=>{
      props.returnstatus(false)
      setDtPlan(response.data)
    }).catch(err=>{
      if(err.response.statusText == "Unauthorized"){ window.location = "/login" }
      else{ Swal.fire('Errors','ลบข้อมูลไม่สำเร็จ','error') }
    })
  }

  const submitForm=(e)=>{
    e.preventDefault();
    setLoading(true)
    axios.put(`${process.env.REACT_APP_API}/updatedtplan/${detailID}`,
    {travel_money,hotel_money,other_money,location,objective,buddy},
    { headers:{authorization:`Bearer ${getToken()}`} })
    .then(response=>{
      Toast().fire({ icon: 'success',title: 'แก้ไขข้อมูลสำเร็จ' })
      fetchData()
      setLoading(false)
      setEditplan({...editplan,detailID:"",travel_money: 0,hotel_money: 0,other_money: 0,location:"",objective:"",buddy:""});})
    .catch(err=>{
      setLoading(false)
      if(err.response.statusText == "Unauthorized"){ window.location = "/login" }
      else{ Swal.fire('Errors',err.response.data.error,'error') }
    })
  }

  return(
    <>
      <DataTable
        columns={columns}
        data={DtPlan}
        selectableRows
        onSelectedRowsChange={handleChange}
        theme='dark'
        pagination
      />
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={submitForm}>
        <Modal.Header closeButton className='bg-cardheader text-white'>
          <Modal.Title><FaRegEdit size={24} /> แก้ไขข้อมูล</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-incard text-white'>
          <Form>
            <Row>
              <Col sm={12}>
                <Form.Label className="text-white"> ชื่อสถานที่ : </Form.Label>
                <Form.Control type="text" placeholder="ชื่อสถานที่" value={location} onChange={inputValue("location")} />
                <Form.Label className="text-white"> วัตถุประสงค์ : </Form.Label>
                <Form.Control type="text" placeholder="วัตถุประสงค์การปฎิบัติงาน" value={objective} onChange={inputValue("objective")} required />
                <Form.Label className="text-white"> ผู้ร่วมเดินทาง : </Form.Label>
                <Form.Control type="text" placeholder="พิมพ์ชื่อผู้ร่วมเดินทาง" value={buddy} onChange={inputValue("buddy")} />
              </Col>
            </Row>
            <Row>
            <Col sm={4}>
              <Form.Label className="text-white"> ค่าเดินทาง : </Form.Label>  
              <Form.Control type="number" placeholder="0.00" value={travel_money} onChange={inputValue("travel_money")} required />
            </Col>
            <Col sm={4}>
              <Form.Label className="text-white"> ค่าที่พัก : </Form.Label>  
              <Form.Control type="number" placeholder="0.00" value={hotel_money} onChange={inputValue("hotel_money")} /> 
            </Col>
            <Col sm={4}>
              <Form.Label className="text-white"> ค่าอื่นๆ : </Form.Label>  
              <Form.Control type="number" placeholder="0.00" value={other_money} onChange={inputValue("other_money")} /> 
            </Col>
            </Row> 
          </Form>
        </Modal.Body>
        <Modal.Footer className='bg-cardheader text-white'>
          <Button type="submit" className='btn-create' onClick={handleClose} disabled={isLoading}>
            {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FaRegEdit size={20} />}
            {isLoading ? ' Saving…' : ' แก้ไข'}
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default DetailPlanDatatable;