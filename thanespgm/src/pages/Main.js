/* eslint-disable */
import { useState,useEffect,createContext } from "react"
import { FaTrashAlt } from "react-icons/fa"
import { Container,Row,Col,Card,Button } from 'react-bootstrap'
import { Helmet } from "react-helmet"
import { getUserInfo,getToken,getUserId,getStatus,getAdmin } from "../utils/Authorize"
import { Toast,DeleteSwal } from '../utils/Swal'
import axios from "axios"
import Swal from "sweetalert2"
import Navbar from '../components/Navbar'
import ExportModal from "../components/ExportModal"
import PlanDatatable from '../components/PlanDatatable'
import SwitchButton from "../components/SwitchButton"
import '../index.css'

const MainContext = createContext()

const Main = ()=>{
  const [Plan,setPlan] = useState([])
  const [selectedRows,setSelectedRows] = useState([])
  const [toggleCleared,setToggleCleared] = useState(false)
  const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_API}/planlist/${getStatus() === "admin" ? getAdmin().split(",",1) : getUserId()}`,
    { headers:{ authorization:`Bearer ${getToken()}` }}
    ).then(response=>{
      setPlan(response.data)
    }).catch(err=>{
      if(err.response.statusText == "Unauthorized"){ window.location = "/login" }
      else{ Swal.fire('Errors',err.response.data.error,'error') } 
    })
  }
  const deletePlan=()=>{
    if(selectedRows.length === 0){
      Swal.fire({ icon: 'warning',text: 'โปรดเลือกอย่างน้อย 1 รายการ'})
    }
    else{
      DeleteSwal().then((result) => {
        if (result.isConfirmed){
          let planidlist = []
          for(let i = 0; i < selectedRows.length; i++) {
            planidlist.push(selectedRows[i].planID)
          }
          axios.delete(`${process.env.REACT_APP_API}/removeplan/${planidlist}`,
          { headers: {authorization:`Bearer ${getToken()}`} })
          .then(response=>{
            setSelectedRows([])
            fetchData()
            Toast().fire({ icon: 'success',title: 'ลบรายการสำเร็จ' })
          })
          .catch(err=>{
            if(err.response.statusText == "Unauthorized"){
              window.location = "/login"
            }
            else{ Swal.fire('Errors',err.response.data.error,'error') }
          })
        }
      })  
    }
  }
  useEffect(()=>{
    fetchData()
  },[])

  return(
    <MainContext.Provider value={{selectedRows,setSelectedRows,Plan,setPlan,toggleCleared,setToggleCleared}}>
    <Helmet>
      <title>หน้าแรก | {' '+getUserInfo().split(",",1)}</title>
    </Helmet>
    <Navbar />
    <Container style={{ padding: 5, marginTop: 1}}>
      <Card className='bg-incard'>
        <Card.Header className='bg-cardheader text-white'>
          <Row>
            <Col md={6}>
              <SwitchButton update={fetchData} />
            </Col>
            <Col md={6} align="right">
              <ExportModal />
              <Button variant="danger" size="sm" onClick={deletePlan}><FaTrashAlt size={16} /> ลบรายการ</Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-1">
          <Row>
            <PlanDatatable />
          </Row>
        </Card.Body>
      </Card>
    </Container>
    </MainContext.Provider>
  )
}
export { MainContext }
export default Main