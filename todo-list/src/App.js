/** @format */

import { useEffect, useState } from 'react'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { TiInputChecked } from 'react-icons/ti'
import './App.css'

function App() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [allTodos, setTodos] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [completedTodos, setCompletedTodos] = useState([])

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
                  </div>
                </div>
              )
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
