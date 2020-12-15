import React from 'react'

const Alert = ({texto}) => {
  return ( 
    <div className="alert alert-warning text-white text-center">{texto}</div>
   );
}
 
export default Alert;