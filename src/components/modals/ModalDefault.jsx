import React from 'react';

const ModalDefault = ({titulo, contenido,clase}) => {


  return (  
    <div className="modal fade" id="modal-default">
              <div className={clase}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">{titulo}</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  {contenido}
                </div>
                {/* /.modal-content */}
              </div>
              {/* /.modal-dialog */}
            </div>
  );
}
 
export default ModalDefault;