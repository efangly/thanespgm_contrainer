
/* eslint-disable */
import DataTable from 'react-data-table-component';
import axios from "axios";
import Swal from "sweetalert2";
import { useState,useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa"
import { getToken } from "../utils/Authorize";
import { locationDataTablecolumn } from '../utils/Columns';
import { DeleteSwal,Toast } from '../utils/Swal';
import "../styles.css";

const LocationDatatable = (props)=>{
  const columns = locationDataTablecolumn()
  columns.push({
    name: "ลบ",
    cell: row => (
      <Button variant="outline-danger" raised primary onClick={()=>{removeLocation(row.locname,row.locationID)}} > 
        <FaTrashAlt />
      </Button>),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    maxWidth: "30px",
    center: true
  })
  const [Loc,setLocation] = useState([])
  const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_API}/locationlist`,
    { headers:{authorization:`Bearer ${getToken()}`} })
    .then(response=>{
      setLocation(response.data)
      props.updaterefresh(false)
    })
    .catch(err=>{
      if(err.response.statusText == "Unauthorized"){ window.location = "/login" }
      else{ Swal.fire('Errors',err.response.data.error,'error') }
    })
  }
  const removeLocation=(locName,locID)=>{
    DeleteSwal().then((result) => {
      if (result.isConfirmed){
        axios.delete(`${process.env.REACT_APP_API}/removelocation/${locID}`,
        { headers:{authorization:`Bearer ${getToken()}`} })
        .then(response=>{ 
          fetchData() 
          Toast().fire({ icon: 'success',title: 'ลบสถานที่ปฏิบัติงานสำเร็จ' })
        })
        .catch(err=>{
          if(err.response.statusText == "Unauthorized"){ window.location = "/login" }
          else{ Swal.fire('Errors',err.response.data.error,'error') }
        })
      }
    })
  }
  useEffect(()=>{
    fetchData()
  },[props.refresh])

  return(
    <>
    <DataTable columns={columns} data={Loc} theme='dark' pagination defaultSortAsc={false} /> 
    </>
  )
}

export default LocationDatatable;


      
