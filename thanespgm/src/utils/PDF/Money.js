/* eslint-disable */
import THBText from "thai-baht-text";
import { getUserInfo,getStatus,getAdmin } from "../Authorize";
import { currentdate } from "../Getdate";

export const Money = (planid,checksum)=>{
  const userinfo = getUserInfo().split(",")
  const admininfo = getAdmin().split(",")
  let firstname = getStatus() === "admin" ? admininfo[1] : userinfo[0]
  let lastname = getStatus() === "admin" ? admininfo[2] : userinfo[1]
  let department = getStatus() === "admin" ? admininfo[4] : userinfo[3]
  let totalmoney = 0
  let travel_money = 0
  let hotel_money = 0
  let other_money = 0
  let totalmoney_text
  let arrPlan = []
  arrPlan.push([
      { text: 'วันที่ปฎิบัติงาน', fontSize:14, alignment:'center'},
      { text: 'สถานที่ปฎิบัติงาน', fontSize:14, alignment:'center'},
      { text: 'ค่าเดินทาง', fontSize:14, alignment:'center'},
      { text: 'ค่าที่พัก', fontSize:14, alignment:'center'},
      { text: 'ค่าอื่นๆ', fontSize:14, alignment:'center'},
      { text: 'รวม', fontSize:14, alignment:'center'}
    ]
  )
  for(let i = 0; i < planid.length; i++){
    let sumMoney = Number(planid[i].travel_money)+Number(planid[i].hotel_money)+Number(planid[i].other_money)
    if(sumMoney % 1 != 0){
      sumMoney = sumMoney.toFixed(2)
    }
    totalmoney = Number(sumMoney)+totalmoney
    travel_money = Number(planid[i].travel_money)+travel_money
    hotel_money = Number(planid[i].hotel_money)+hotel_money
    other_money = Number(planid[i].other_money)+other_money
    arrPlan.push([
      { text: planid[i].dateplan, fontSize:14, alignment:'center'},
      { text: planid[i].objective+' '+planid[i].location, fontSize:14},
      { text: planid[i].travel_money, fontSize:12, alignment:'center'},
      { text: planid[i].hotel_money, fontSize:12, alignment:'center'},
      { text: planid[i].other_money, fontSize:12, alignment:'center'},
      { text: sumMoney, fontSize:12, alignment:'center'}
    ])
  }
  if(checksum == 'T'){
    totalmoney_text = THBText(totalmoney)
    if(totalmoney % 1 != 0){
      totalmoney = totalmoney.toFixed(2)
    }
    totalmoney = totalmoney.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    if(travel_money === 0 ){
      travel_money = " "
    }else{
      if(travel_money % 1 != 0){
        travel_money = travel_money.toFixed(2)
      }
      travel_money = travel_money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    }
    if(hotel_money === 0 ){
      hotel_money = " "
    }else{
      if(hotel_money % 1 != 0){
        hotel_money = hotel_money.toFixed(2)
      }
      hotel_money = hotel_money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    }
    if(other_money === 0 ){
      other_money = " "
    }else{
      if(other_money % 1 != 0){
        other_money = other_money.toFixed(2)
      }
      other_money = other_money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    }
  }else{
    totalmoney= " "
    travel_money= " "
    hotel_money= " "
    other_money = " "
    totalmoney_text = ".........................................."
  }

  const docDefinition = {
    info: { title: 'Report-Money' },
    pageSize: "A4",
    pageMargins: [30, 180, 30, 240],
    header:{
      lineHeight:1,
      stack:[
        { text: 'การชำระบัญชีเงินทดรองจ่าย \n ค่าใช้จ่ายการเดินทางไปต่างจังหวัด/ต่างประเทศ', alignment:'center',fontSize:20,margin:[0,30,0,0],lineHeight:0.7 },
        { columns: [
          { text: 'วันที่: '+currentdate(),fontSize:14,margin:[30,0,0,0] },
          { text: 'อ้างใบเบิกทดรองจ่ายเลขที่ : .....................', alignment:'right',fontSize:14,margin: [0,0,30,0] }
        ]},
        { columns: [
          { text: 'ชื่อ: '+firstname+' '+lastname,fontSize:14,margin:[30,0,0,0] },
          { text: 'แผนก : '+department, alignment:'right',fontSize:14,margin: [0,0,30,0] }
        ]},
        { columns: [
          { text: 'จำนวนเงินที่เบิก : ..................'+totalmoney.replace(" ",".")+'................บาท',fontSize:14,margin:[30,0,0,0] },
          { text: '(............'+totalmoney_text+'...........)', alignment:'right',fontSize:14,margin: [0,0,30,0] }
        ]},
        { columns: [
          { text: 'ชำระบัญชีเป็นค่าใช้จ่ายจำนวนเงิน : ..............................................บาท ',fontSize:14,margin:[30,0,0,0] },
          { text: '(..........................................................................................)', alignment:'right',fontSize:14,margin: [0,0,30,0] }
        ]},
        { columns: [
          { text: 'ตามระยะเวลาในการเดินทาง : .......... '+planid.length+' ..........วัน',fontSize:14,margin:[30,0,0,0] },
          { text: 'ตั้งแต่วันที่.......'+planid[0].dateplan+'.......ถึง.......'+planid[planid.length-1].dateplan+'.......', alignment:'right',fontSize:14,margin: [0,0,30,0] }
        ]},
        { text: 'หมายเหตุ. : เบิกก่อนเดินทางอย่างน้อย 7 วัน และต้องชำระภายใน 7 วัน นับจากสิ้นสุดการเดินทาง',fontSize:14,margin:[30,0,0,0] }
      ]
    },
    footer:(currentPage, pageCount)=>{ 
      return {
        stack:[
          { //lineHeight:0.9,
            columns: [
            { layout: 'noBorders',margin: [ 0, 0, 0, 0 ],table: { widths: [ '*' ],body: [ [' '] ] }},
            { layout: 'noBorders',
              table:{ widths: [ '*' ],
                body:[ 
                  [{text: 'ค่าใช้จ่ายทั้งสิ้น . ',fontSize:14,alignment:'right'}],
                  [{text: 'หักยอดเบิกทดลองจ่าย . ',fontSize:14,alignment:'right'}],
                  [{text: 'ยอดเงินคงเหลือ..............จ่ายเพิ่ม . ',fontSize:14,alignment:'right'}]
                ] 
              } 
            },
            { margin: [ 0, 0, 30, 0 ],table: {widths: [ 38,30,30,35 ],
                body: [ 
                  [{text:travel_money,fontSize:12,alignment:'center'},
                  {text:hotel_money,fontSize:12,alignment:'center'},
                  {text:other_money,fontSize:12,alignment:'center'},
                  {text:totalmoney,fontSize:12,alignment:'center'}],
                  [' ',' ',' ',' '],
                  [' ',' ',' ',' '] 
                ]}
            }
          ]},
          { layout: 'noBorders',
            table: {
              widths: [ 50,'*','*',50 ],
              body: [
                [' ',' ',' ',' '],
                ['',{ text: '........................................................', fontSize:16, alignment:'center'},
                { text: '........................................................', fontSize:16, alignment:'center'},''],
                ['',{ text: 'กรรมการผู้จัดการ/ผู้จัดการทั่วไป', fontSize:14, alignment:'center'},
                { text: 'ผู้ขอเบิกค่าใช้จ่าย', fontSize:14, alignment:'center'},''],
                [' ',' ',' ',' '],
                ['',{ text: '........................................................', fontSize:16, alignment:'center'},
                { text: '........................................................', fontSize:16, alignment:'center'},''],
                ['',{ text: 'ผู้จัดการแผนกบัญชี', fontSize:14, alignment:'center'},
                { text: 'ผู้จัดการเขต', fontSize:14, alignment:'center'},''],
                [' ',' ',' ',' '],
                ['','',{ text: '........................................................', fontSize:16, alignment:'center'},''],
                ['','',{ text: 'ผู้จัดการแผนก', fontSize:14, alignment:'center'},'']
              ]
            }
          },
          { text: 'หน้า: '+currentPage.toString()+'/'+pageCount, alignment: 'right',fontSize:14,margin: [0,0,30,0] }
        ]
      }
    },
    content: [
      { table: { 
        headerRows: 1,
        heights: 5,
        widths: [ 55,'*',39,30,30,30 ],
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