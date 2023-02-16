/* eslint-disable */
import pdfMake from "pdfmake/build/pdfmake"; 
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useState,useEffect } from "react"
import { Hr } from "../utils/PDF/Hr"
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

const HrPDF = (props)=>{
  const [url, setUrl] = useState(null)
  const create =(List)=>{
    const pdfDocGenerator = pdfMake.createPdf(Hr(List))
    pdfDocGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setUrl(url);
    });
  }
  useEffect(()=>{
    create(props.data)
  },[])
  useEffect(() => {
    return () => {
      if (url !== null){ 
        URL.revokeObjectURL(url) 
      }
    }
  },[url])
  
  return(
    <>
    {url && (
      <div>
        <object style={{ width: "100%",height: "85vh"}} data={url} type="application/pdf">
          <embed src={url} type="application/pdf" />
        </object>
      </div>
      )}
    </>
  )
}

export default HrPDF