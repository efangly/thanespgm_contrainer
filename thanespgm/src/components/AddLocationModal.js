/* eslint-disable */
import { FaUserPlus } from "react-icons/fa"
import { BiMap } from "react-icons/bi";
import { Form,Modal,Button,Spinner } from 'react-bootstrap'
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import '../index.css'
import { getToken} from "../utils/Authorize"
import { Toast } from "../utils/Swal";

const AddLocationModal = (props)=>{
  const [isLoading, setLoading] = useState(false)
  const [Location,setLocation] = useState({locname:"",price:""})
  const {locname,price} = Location;
  const inputValue = name=>event=>{
    setLocation({...Location,[name]:event.target.value});
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitForm=(e)=>{
    e.preventDefault();
    setLoading(true)
    axios.post(`${process.env.REACT_APP_API}/createlocation`,{locname,price},
    { headers: {authorization:`Bearer ${getToken()}`} })
    .then(response=>{
      setLoading(false)
      Toast().fire({ icon: 'success',title: 'เพิ่มสถานที่ปฏิบัติงานสำเร็จ' })
      props.updateadd(true)
      setLocation({...Location,locname:"",price:""});
    }).catch(err=>{
      setLoading(false)
      if(err.response.statusText == "Unauthorized"){
        window.location = "/login"
      }
      else{ Swal.fire('Errors',err.response.statusText,'error') }
    })
  }

  return(
    <>
    <Button className="btn-create" onClick={handleShow}> <BiMap size={24} /> เพิ่มสถานที่</Button>
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={submitForm}>
      <Modal.Header closeButton className='bg-cardheader text-white'>
        <Modal.Title><BiMap size={24} /> เพิ่มสถานที่ปฏิบัติงาน</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-incard text-white'>
        <Form> 
          <Form.Label className="text-white"> ชื่อสถานที่ : </Form.Label>
          <Form.Control type="text" placeholder="ใส่ชื่อสถานที่" value={locname} onChange={inputValue("locname")} required />
          <Form.Label className="text-white"> ค่าเดินทาง : </Form.Label>  
          <Form.Control type="number" placeholder="0.00" value={price} onChange={inputValue("price")} required /> 
        </Form>
      </Modal.Body>
      <Modal.Footer className='bg-cardheader text-white'>
        <Button type="submit" className='btn-create' onClick={handleClose} disabled={isLoading}>
          {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <FaUserPlus />}
          {isLoading ? ' กำลังบันทึก…' : ' เพิ่มสถานที่ทำงาน'}
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
    </>
  )
}

export default AddLocationModal;