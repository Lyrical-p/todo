/** @format */

import { useEffect, useState } from 'react'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { TiInputChecked } from 'react-icons/ti'
import { AiOutlineEdit } from 'react-icons/ai'
import './App.css'

function App() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [allTodos, setTodos] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [completedTodos, setCompletedTodos] = useState([])
  const [currentEdit, setCurrentEdit] = useState('')
  const [currentEditedItem, setCurrentEditedItem] = useState('')

  const handleAddTodo = () => {
    let newTodo = {
      title: newTitle,
      description: newDesc,
    }

    let updatedTodo = [...allTodos]
    updatedTodo.push(newTodo)
    setTodos(updatedTodo)
    localStorage.setItem('todolist', JSON.stringify(updatedTodo))

    setNewTitle('')
    setNewDesc('')
  }

  const handleDelete = (index) => {
    let removeTodo = [...allTodos]
    removeTodo.splice(index, 1)

    localStorage.setItem('todolist', JSON.stringify(removeTodo))
    setTodos(removeTodo)
  }

  const handleCompleted = (index) => {
    let now = new Date()
    let dd = now.getDate()
    let mm = now.getMonth() + 1
    let yyyy = now.getFullYear()
    let hh = now.getHours()
    let min = now.getMinutes()
    let sec = now.getSeconds()

    let completedOn =
      dd + '/' + mm + '/' + yyyy + ' at ' + hh + ':' + min + ':' + sec

    let filteredItems = {
      ...allTodos[index],
      completedOn: completedOn,
    }

    let updatedCompleted = [...completedTodos]
    updatedCompleted.push(filteredItems)
    setCompletedTodos(updatedCompleted)
    handleDelete(index)

    localStorage.setItem('completedTodos', JSON.stringify(updatedCompleted))
  }

  const handleDeleteCompleted = (index) => {
    let removeCompleted = [...completedTodos]
    removeCompleted.splice(index, 1)

    localStorage.setItem('completedTodos', JSON.stringify(removeCompleted))
    setCompletedTodos(removeCompleted)
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompleted = JSON.parse(localStorage.getItem('completedTodos'))

    if (savedTodo) {
      setTodos(savedTodo)
    }

    if (savedCompleted) {
      setCompletedTodos(savedCompleted)
    }
  }, [])

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind, item)
    setCurrentEditedItem(item)
  }

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value }
    })
  }

  const handleUpdateDesc = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value }
    })
  }

  const handleUpdateDetails = () => {
    let newdetails = [...allTodos]
    newdetails[currentEdit] = currentEditedItem
    setTodos(newdetails)
    localStorage.setItem('todolist', JSON.stringify(newdetails))
    setCurrentEdit('')
    setCurrentEditedItem('')
  }

  return (
    <div className='App'>
      <h1>My Todo List</h1>
      <div className='todo-wrapper'>
        <div className='input'>
          <div className='input-item'>
            <label>Title</label>
            <input
              type='text'
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder='Enter title'
            />
          </div>
          <div className='input-item'>
            <label>Description</label>
            <input
              type='text'
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder='Enter description'
            />
          </div>
          <div className='input-item'>
            <button
              type='button'
              onClick={handleAddTodo}
              className='primaryBtn'
            >
              Add Todo
            </button>
          </div>
        </div>
        <div className='btn'>
          <button
            className={`secondaryBtn ${isCompleted === false && 'active'}`}
            onClick={() => setIsCompleted(false)}
          >
            TODO
          </button>
          <button
            className={`secondaryBtn ${isCompleted === true && 'active'}`}
            onClick={() => setIsCompleted(true)}
          >
            Completed
          </button>
        </div>
        <div className='todo-list'>
          {isCompleted === false &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className='edit-wrapper' key={index}>
                    <input
                      placeholder='Update Title'
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem.title}
                    />
                    <textarea
                      placeholder='Update Description'
                      onChange={(e) => handleUpdateDesc(e.target.value)}
                      rows={4}
                      value={currentEditedItem.description}
                    />
                    <button
                      type='button'
                      onClick={handleUpdateDetails}
                      className='primaryBtn'
                    >
                      Update
                    </button>
                  </div>
                )
              } else {
                return (
                  <div className='todo-item' key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      <RiDeleteBin6Fill
                        className='icon'
                        onClick={() => handleDelete(index)}
                        title='Delete?'
                      />
                      <TiInputChecked
                        className='check-icon'
                        onClick={() => handleCompleted(index)}
                        title='Complete?'
                      />
                      <AiOutlineEdit
                        className='check-icon'
                        onClick={() => handleEdit(index, item)}
                        title='Edit?'
                      />
                    </div>
                  </div>
                )
              }
            })}

          {isCompleted === true &&
            completedTodos.map((item, index) => {
              return (
                <div className='todo-item' key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on: {item.completedOn}</small>
                    </p>
                  </div>
                  <div>
                    <RiDeleteBin6Fill
                      className='icon'
                      onClick={() => handleDeleteCompleted(index)}
                      title='Delete?'
                    />
                    {/* <TiInputChecked
                      className='check-icon'
                      onClick={() => handleCompleted(index)}
                      title='Complete?'
                    /> */}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default App
