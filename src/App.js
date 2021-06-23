import './App.css';
import { useState,useEffect } from 'react'
import Todo from './Todo';
import { v4 as uuidv4 } from 'uuid';
import Alert from './Alert';
import db from './firebase';
import firebase from 'firebase';
function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [alert, setAlert] = useState({ message: '', type: '', show: false })
  const [editId, setEditId] = useState(null)
  useEffect(() => {
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      // console.log(snapshot.docs.map(doc=>doc.data()))
      const newTodos= (snapshot.docs.map((doc)=>{return({...doc.data(),id:doc.id})}))
      // console.log(newTodos);
      setTodos(newTodos)
      // console.log(todos);
    })
  }, [])
  const submitHandler = (e) => {
    e.preventDefault()
    if (!input) {
      setAlert({ message: 'Please enter a value', type: 'danger', show: true })
    }
    else if (isEditing) {
      // setTodos(todos.map((data) => {
      //   if (data.id === editId) {
      //     return { ...data, title: input }
      //   }
      //   return data
      // }))//no need of this now
      db.collection("todos").doc(editId).update({
        "title": input
        
    })
      setIsEditing(false)
      setEditId(null)
      setInput('')
      setAlert({ message: 'value edited', type: 'success', show: true })
    }
    else {
      // setTodos([...todos, { title: input, id: uuidv4() }])//not required now as data is stored in state directly through firebase
      setInput('')
      setAlert({ message: 'Todo added', type: 'success', show: true })
      db.collection('todos').add(
        {
          title:input,
          timestamp:firebase.firestore.FieldValue.serverTimestamp()
        }
      )
    }
  }
  const deleteItem = (id) => {
    // setTodos(todos.filter((data) => { return (data.id !== id) })) // no need of this as directly deleting in database which in turn change state directly
    setAlert({ message: 'item deleted', type: 'danger', show: true })
    db.collection('todos').doc(id).delete()
  }
  const editItem = (id) => {
    setIsEditing(true)
    setEditId(id)
    const editInput = todos.filter(data => data.id === id)[0].title
    setInput(editInput)
  }
  const clearList=()=>{
    setTodos([])
    setAlert({ message: 'list cleared', type: 'danger', show: true })
    for (let index = 0; index < todos.length; index++) {
    db.collection('todos').doc(todos[index].id).delete()
    }

  }
  const removeAlert=()=>{
    setAlert({...alert,show:false})
  }
  return (
    <div className="App">
      {alert.show && 
      <Alert 
      alert={alert} 
      removeAlert={removeAlert}
      todos={todos}
      />}
      <h1>Todos</h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='e.g. Go To Walk' onChange={(e) => { setInput(e.target.value) }} value={input} />
        <button type="submit">{isEditing ? 'Edit' : 'Add'}</button>
      </form>
      {todos.length>0 &&
      <div style={{width:'100%'}}>
        <Todo
        todos={todos}
        deleteItem={deleteItem}
        editItem={editItem}
        />
        <button onClick={clearList} className='clear-btn'>Clear Items</button>
        </div>
        }
    </div>
  );
}

export default App;
