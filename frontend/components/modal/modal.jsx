import React from "react";

const Modal = (props) => {
  const closeModal = function() {
    props.closeModal();
  };

  let modalState = "";
  if (props.showModal == "hidden") {
    modalState = " modal-hidden";
  }

  return (
    <section 
      id="modal"
      className={"modal" + modalState}
      onClick={ closeModal }>
      <div 
        id="modal-content-container"
        className="modal-content-container">
        <section
          id="modal-content"
          className="modal-content">
          { props.children }
          <p 
            id="modal-close-button"
            className="modal-close-button"
            onClick={ closeModal }>x</p>
        </section>
      </div>
    </section>
  );
}

export default Modal;
