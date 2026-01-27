/*
pass modal data in and change based on key? resetting by changing key?
https://react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key
https://react.dev/learn/preserving-and-resetting-state
*/

import ModalForm from "./form";

function Modal() {

  // use context to hold modal maybe?
  function handleHideModal() {
    let modalLayer = document.getElementById('modal_layer');
    let formModal = document.getElementById('form_modal');
    let form = document.querySelector('#form_modal form') as HTMLFormElement;

    if (modalLayer && formModal && form) {
      modalLayer.style.display = 'none';
      formModal.style = '';
      form.reset();
      form.dataset.id = '';
    }
  }

  return (
    <>
      <div className="modal" id="modal_layer" onClick={handleHideModal}></div>
      <div className="modal" id="form_modal">
        <ModalForm hideModal={handleHideModal}></ModalForm>
      </div>
    </>
  )
}

export default Modal;
