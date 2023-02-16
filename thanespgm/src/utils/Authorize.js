//เก็บ token login
export const authenticate=(response,next)=>{
  if(window !== "undefined"){
    //เก็บข้อมูล session storage
    const userinfo = JSON.stringify(response.data.firstname+","+response.data.lastname+","+response.data.job+","+response.data.department)
    const useradmin = JSON.stringify(response.data.userID,response.data.firstname+","+response.data.lastname+","+response.data.job+","+response.data.department)
    localStorage.setItem("token",JSON.stringify(response.data.token))
    localStorage.setItem("username",JSON.stringify(response.data.username))
    localStorage.setItem("userID",JSON.stringify(response.data.userID))
    localStorage.setItem("status",JSON.stringify(response.data.status))
    localStorage.setItem("userInfo",userinfo)
    localStorage.setItem("userInfo_Admin",useradmin)
  }
  next()
}
//ดึงข้อมูล token
export const getToken=()=>{
  if(window !== "undefined"){
    if(localStorage.getItem("token")){
      return JSON.parse(localStorage.getItem("token"))
    }
    else{
      return false
    }
  }
}
//ดึงข้อมูล username
export const getUser=()=>{
  if(window !== "undefined"){
    if(localStorage.getItem("username")){
      return JSON.parse(localStorage.getItem("username"))
    }
    else{
      return false
    }
  }
}
//ดึงข้อมูล userID
export const getUserId=()=>{
  if(window !== "undefined"){
    if(localStorage.getItem("userID")){
      return JSON.parse(localStorage.getItem("userID"))
    }
    else{
      return false
    }
  }
}
//ดึงข้อมูล user
export const getUserInfo=()=>{
  if(window !== "undefined"){
    if(localStorage.getItem("userInfo")){
      return JSON.parse(localStorage.getItem("userInfo"))
    }
    else{
      return false
    }
  }
}
//ดึงข้อมูล status
export const getStatus=()=>{
  if(window !== "undefined"){
    if(localStorage.getItem("status")){
      return JSON.parse(localStorage.getItem("status"))
    }
    else{
      return false
    }
  }
}
//ดึงข้อมูล admin
export const getAdmin=()=>{
  if(window !== "undefined"){
    if(localStorage.getItem("userInfo_Admin")){
      return JSON.parse(localStorage.getItem("userInfo_Admin"))
    }
    else{
      return false
    }
  }
}
//logout
export const logout=(next)=>{
  if(window !== "undefined"){
    localStorage.removeItem("userInfo_Admin")    
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userID")
    localStorage.removeItem("userInfo")
    localStorage.removeItem("status")
  }
  next()
}