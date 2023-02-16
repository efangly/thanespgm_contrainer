/* eslint-disable */
import axios from "axios";
import DataTable from 'react-data-table-component';
import { FaTrashAlt  } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import "../styles.css";
import { DeleteSwal,Toast } from '../utils/Swal';
import { userDataTablecolumn } from '../utils/Columns';
import { getToken } from "../utils/Authorize";

const UserDatatable = (props)=>{
  const columns = userDataTablecolumn()
  columns.push({
    name: "ลบ",
    cell: row => (
      <Button variant="outline-danger" raised primary onClick={()=>{removeUser(row.userID)}} > 
        <FaTrashAlt />
      </Button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    maxWidth: "30px",
    center: true
  })

  const removeUser=(userID)=>{
    DeleteSwal().then((result) => {
      if(result.isConfirmed){
        axios.delete(`${process.env.REACT_APP_API}/removeuser/${userID}`,
        { headers: {authorization:`Bearer ${getToken()}`} })
        .then(response=>{ 
          props.update()
          Toast().fire({ icon: 'success',title: 'ลบผู้ใช้งานสำเร็จ' })
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
  return(
    <>
    <DataTable columns={columns} data={props.data} theme='dark' pagination defaultSortAsc={false} /> 
    </>
  )
}

export default UserDatatable;