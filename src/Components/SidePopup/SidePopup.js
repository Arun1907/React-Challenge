import React from "react";
import './SidePopup.css'


 const SidePopup=({isOpen, onClose, children,handleSaveSegment, onCancel})=>{
    if(!isOpen) return null;

    return(
       
            <div className={`right-side-modal ${isOpen ? 'open' : ''}`}>
              <div className="modal-header">
                <div style={{display: 'flex', alignItems: 'center' }}>
                <span onClick={onClose}><i class="fa fa-chevron-left" style={{fontSize:'20px', paddingLeft:''}}></i></span>
                  <h3 style={{marginLeft: "20px"}}>Saving Segment</h3>
                  </div>
                </div>
              <div className="modal-content">
                
                <div className="modal-body">
                {children}
                </div> 
              </div>
              <div className="modal-footer">
                    <button className="btn-save" onClick={handleSaveSegment}>Save the Segment</button>
                    <button className="btn-cancel" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        
    )
 }
export default SidePopup;