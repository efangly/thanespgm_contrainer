/* eslint-disable */
import { getUserInfo,getStatus,getAdmin } from "../Authorize";
import { currentdate } from "../Getdate";

export const Hr = (planid)=>{
  const userinfo = getUserInfo().split(",")
  const admininfo = getAdmin().split(",")
  let firstname = getStatus() === "admin" ? admininfo[1] : userinfo[0]
  let lastname = getStatus() === "admin" ? admininfo[2] : userinfo[1]
  let job = getStatus() === "admin" ? admininfo[3] : userinfo[2]
  let department = getStatus() === "admin" ? admininfo[4] : userinfo[3]
  let arrPlan = []
  arrPlan.push([
      { text: 'วันที่', fontSize:16, alignment:'center'},
      { text: 'เข้างาน', fontSize:14, alignment:'center'},
      { text: 'ออกงาน', fontSize:14, alignment:'center'},
      { text: 'สถานที่', fontSize:16, alignment:'center'},
      { text: 'วัตถุประสงค์', fontSize:16, alignment:'center'},
      { text: 'ผู้ร่วมเดินทาง', fontSize:16, alignment:'center'},
      { text: 'ผู้อนุมัติ', fontSize:16, alignment:'center'}
    ]
  )
  for(let i = 0; i < planid.length; i++) {
    arrPlan.push([
      { text: planid[i].dateplan, fontSize:16, alignment:'center'},
      { text: '08:00', fontSize:16, alignment:'center'},
      { text: '17:00', fontSize:16, alignment:'center'},
      { text: planid[i].location, fontSize:16},
      { text: planid[i].objective, fontSize:16},
      { text: planid[i].buddy, fontSize:16},
      { text: '', fontSize:16, alignment:'center'}
    ])
  }

  const docDefinition = {
    info: { title: 'Report-HR' },
    pageSize: "A4",
    pageOrientation: "landscape",
    pageMargins: [30, 60, 30, 30],
    header:{
      stack:[
        { text: 'รายงานการออกนอกสถานที่', alignment:'center',fontSize:18,margin:[0,20,0,0] },
        { columns: [
          { text: 'ชื่อ: '+firstname+' '+lastname+'  ตำแหน่ง: '+job+'  ฝ่าย/แผนก: '+department,fontSize:16,margin:[30,0,0,0] },
          { text: 'วันที่เขียนเอกสาร: '+currentdate(), alignment:'right',fontSize:16,margin: [0,0,30,0] }
        ]}
      ]
    },
    footer:(currentPage, pageCount)=>{ 
      return { text: 'หน้า: '+currentPage.toString()+'/'+pageCount, alignment: 'right',fontSize:14,margin: [0,0,30,0] }
    },
    content: [
      { table: { 
        headerRows: 1,
        heights: 5,
        widths: [ 55,30,35,'*','*',100,70 ],
        body: arrPlan,
      }}
    ],
    defaultStyle:{
      font: 'THSarabunNew',
      lineHeight:0.7
    }
  }

  return docDefinition
}