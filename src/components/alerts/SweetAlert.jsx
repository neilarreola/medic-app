import React from 'react'
import Swal from 'sweetalert2'


  const Toast = Swal.mixin({
    toast:true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  const sweetAlert = (icono, texto) =>{
    Toast.fire({
      icon: icono,
      title: texto
    })
  }
  
export {sweetAlert}