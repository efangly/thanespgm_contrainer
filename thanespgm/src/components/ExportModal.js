/* eslint-disable */
import { FaFilePdf } from "react-icons/fa"
import { Modal,Tab,Tabs,Button } from 'react-bootstrap'
import { useState,useContext } from "react"
import { MainContext } from "../pages/Main"
import HrPDF from './ExportPdfHr'
import MonthPDF from './ExportPdfMonth'
import MoneyPDF from './ExportPdfMoney'
import { getToken } from "../utils/Authorize"
import Swal from "sweetalert2"
import axios from "axios"
import '../index.css'


const ExportModal = ()=>{
  const {selectedRows,setSelectedRows,toggleCleared,setToggleCleared} = useContext(MainContext)
  const [show, setShow] = useState(false)
  const [tabs,setTabs] = useState(1)
  const [Planlist, setPlanlist] = useState([])
  const handleShow = () => {
    if(selectedRows.length === 0){
      Swal.fire({icon: 'warning',text: 'โปรดเลือกอย่างน้อย 1 รายการ'})
    }else{
      let allplanlist = []
      for(let i = 0; i < selectedRows.length; i++){
        allplanlist.push(selectedRows[i].planID)
      }
      axios.get(`${process.env.REACT_APP_API}/exportplanpdf/${allplanlist}`,
      { headers:{authorization:`Bearer ${getToken()}`} })
      .then(response=>{
        setPlanlist(response.data)
        setShow(true)
        setSelectedRows([])
        setToggleCleared(!toggleCleared)
      }).catch(err=>{
        if(err.response.statusText == "Unauthorized"){ window.location = "/login" }
        else{ Swal.fire('Errors',err.response.data.error,'error') }
      })
    }
  }
  const handleClose = () => {
    setTabs(1)
    setShow(false)
  }

  return(
    <>
    <Button className="me-1" size="sm" variant="success" onClick={handleShow}><FaFilePdf size={16} /> ออกรายงาน</Button>
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton className='bg-reportheader text-white'>
        <Modal.Title>
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-reportcard text-white py-1 px-2'>
        <Tabs activeKey={tabs} onSelect={(k) => setTabs(k)} className="mb-1" fill>
          <Tab eventKey="1" title="รายงานปฏิบัติงาน">
            <MonthPDF data={Planlist} />
          </Tab>
          <Tab eventKey="2" title="รายงานการเงิน">
            <MoneyPDF data={Planlist} type={"F"} />
          </Tab>
          <Tab eventKey="3" title="รายงานการเงิน(รวมเงิน)">
            <MoneyPDF data={Planlist} type={"T"} />
          </Tab>
          <Tab eventKey="4" title="รายงานฝ่ายบุคคล">
            <HrPDF data={Planlist} />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default ExportModal