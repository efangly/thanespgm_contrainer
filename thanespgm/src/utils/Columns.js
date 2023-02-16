/* eslint-disable */
import { Button } from 'react-bootstrap';
import { FaRegEdit  } from "react-icons/fa";
import { Link } from 'react-router-dom'
export const columnPlan=()=>{
  const columns = [
    {
      name: "สถานที่",
      selector: (row) => row.location,
      reorder: true
    },
    {
      name: "วัตถุประสงค์",
      selector: (row) => row.objective,
      hide: "md",
      reorder: true
    },
    {
      name: "ผู้ร่วมเดินทาง",
      selector: (row) => row.buddy,
      hide: "md",
      maxWidth: "150px"
    },
    {
      name: "วันที่ปฏิบัติงาน",
      cell: row => (`${row.date_start}-${row.date_end}`),
      maxWidth: "180px",
      center: true
    },
    {
      name: "แก้ไข",
      cell: row => (
        <Link to={`/detailplan/${row.planID}`}>
          <Button variant="outline-info" raised primary > <FaRegEdit /></Button>
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      maxWidth: "30px",
      center: true
    }
  ]
  return columns
}

export const userDataTablecolumn=()=>{
  const columns = [
    {
      name: "รหัสพนักงาน",
      selector: (row) => row.userID,
      maxWidth: "130px",
      reorder: true
    },
    {
      name: "ชื่อ-นามสกุล",
      selector: (row) => row.fullname,
      reorder: true
    },
    {
      name: "ชื่อเล่น",
      selector: (row) => row.nickname,
      maxWidth: "130px",
      hide: "md",
      reorder: true
    },
    {
      name: "ตำแหน่ง",
      selector: (row) => row.job,
      maxWidth: "130px",
      hide: "md",
      reorder: true
    }
  ]
  return columns
}

export const locationDataTablecolumn=()=>{
  const columns = [
    {
      name: "ชื่อสถานที่ปฏิบัติงาน",
      selector: (row) => row.locname,
      reorder: true
    },
    {
      name: "ค่าเดินทาง",
      selector: (row) => row.price,
      maxWidth: "140px",
      hide: "md",
      center: true,
      reorder: true
    }
  ]
  return columns
}
  
export const DetailPlanDataTablecolumn=()=>{
  const columns = [
    {
      name: "วันที่ปฏิบัติงาน",
      selector: (row) => row.dateplan,
      maxWidth: "150px",
      center: true,
      reorder: true
    },
    {
      name: "สถานที่",
      selector: (row) => row.location,
      hide: "md"
    },
    {
      name: "วัตถุประสงค์",
      selector: (row) => row.objective,
      reorder: true
    },
    {
      name: "ผู้ร่วมเดินทาง",
      selector: (row) => row.buddy,
      maxWidth: "150px",
      hide: "md"
    },
    {
      name: "ค่าเดินทาง",
      selector: (row) => row.travel_money,
      hide: "md",
      maxWidth: "110px",
      center: true
    },
    {
      name: "ค่าที่พัก",
      selector: (row) => row.hotel_money,
      hide: "md",
      maxWidth: "40px",
      center: true
    },
    {
      name: "ค่าอื่นๆ",
      selector: (row) => row.other_money,
      hide: "md",
      maxWidth: "40px",
      center: true
    }
  ]
  return columns
}
