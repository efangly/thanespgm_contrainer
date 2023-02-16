/* eslint-disable */
import pdfMake from "pdfmake/build/pdfmake"; 
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useState,useEffect } from "react"
import { Money } from "../utils/PDF/Money"
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

export const MoneyPDF = (props)=>{
  const [url, setUrl] = useState(null)
  const create =(List,Type)=>{
    const pdfDocGenerator = pdfMake.createPdf(Money(List,Type))
    pdfDocGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setUrl(url);
    });
  }
  useEffect(()=>{
    create(props.data,props.type)
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

export default MoneyPDF