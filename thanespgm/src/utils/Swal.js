import Swal from "sweetalert2";

export const Toast=()=>{
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  return Toast
}

export const DeleteSwal=()=>{
  const DeleteSwal = Swal.fire({
    text: "ต้องการที่จะลบ?",
    icon: 'error',
    showCancelButton: true,
    confirmButtonColor: '##FF3030',
    cancelButtonColor: '#595959',
    confirmButtonText: 'Delete'
  })
  return DeleteSwal
}