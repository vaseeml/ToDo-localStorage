import './App.css'
import { useState } from 'react'
import ToDoForm from './Components/ToDoForm';
import ToDoList from './Components/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
function App() {
  const [modal, setModal] = useState(false)
  const [ editData , setEditData ] = useState({})
  const toggle = () => {
      setModal(!modal)
  }
  const handleEdit = (task)=>{
    setEditData(task)
  }
  const handleClearState = ()=>{
    setEditData({})
  }
  return (
    <div>
      <button onClick={toggle} style={{backgroundColor:'green' , color:'white'}}>
        Add Task
      </button>
      <ToDoList toggle={toggle} handleEdit={handleEdit}/>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> Edit Product</ModalHeader>
        <ModalBody>
            <ToDoForm toggle={toggle} editData={editData} handleClearState={handleClearState}/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
