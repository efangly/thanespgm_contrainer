/* eslint-disable */
import DataTable from 'react-data-table-component';
import { useCallback,useContext } from "react";
import { MainContext } from "../pages/Main"
import { columnPlan } from '../utils/Columns';
import "../styles.css";

const PlanDatatable = ()=>{
  const {setSelectedRows,Plan,toggleCleared} = useContext(MainContext)
  const paginationOptions = {
    rowsPerPageText: 'จำนวนแถวต่อหน้า',
    rangeSeparatorText: 'จาก'
  }
  const handleChange = useCallback(state => {
		setSelectedRows(state.selectedRows)
	},[])

  return(
    <>
      <DataTable
        columns={columnPlan()}
        data={Plan}
        selectableRows
        onSelectedRowsChange={handleChange}
        clearSelectedRows={toggleCleared}
        theme='dark'
        pagination
        paginationComponentOptions={paginationOptions}
        defaultSortAsc={false}
      />
    </>
  )
}

export default PlanDatatable;