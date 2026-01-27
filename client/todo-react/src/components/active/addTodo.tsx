function AddTodoButton() {

  // use context to hold modal info?
  function showEmptyModal() {
    let modalLayer = document.getElementById('modal_layer');
    let formModal = document.getElementById('form_modal');

    if (modalLayer && formModal) {
      modalLayer.style.display = 'block';
      formModal.style = 'display: block; top: 200px;';
    }
  }

  return (
    <>
      <label htmlFor="new_item" onClick={showEmptyModal}>
        <img src="images/plus.png" alt="Add Todo Item" />
        <h2>Add new to do</h2>
      </label>
    </>
  )
}

export default AddTodoButton;
