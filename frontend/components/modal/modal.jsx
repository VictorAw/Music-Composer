import React from "react";

const leaveModal = (router) => (e) => {
  console.log(e.target);
  if (e.target.id === "modal" ||
      e.target.id === "modal-content-container" ||
      e.target.id === "modal-close-button") {
    router.push("/")
  }
}

const Modal = ({children, router}) => {  
  return (
    <section id="modal" className="modal" onClick={leaveModal(router)}>
      <div id="modal-content-container" className="modal-content-container">
        <section id="modal-content" className="modal-content">
          <p id="modal-close-button" className="modal-close-button" onClick={leaveModal(router)}>x</p>
          { children }
        </section>
       </div>
    </section> 
  );
}

export default Modal;
