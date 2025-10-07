/** @format */

import { useState } from 'react'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { TiInputChecked } from 'react-icons/ti'
import './App.css'

function App() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [allTodos, setTodos] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')

  const handleAddTodo = () => {
    let newTodo = {
      title: newTitle,
      description: newDesc,
    }

    let updatedTodo = [...allTodos]
    updatedTodo.push(newTodo)
    setTodos(updatedTodo)
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
          {allTodos.map((item, index) => {
            return (
              <div className='todo-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <RiDeleteBin6Fill className='icon' />
                  <TiInputChecked
                    className='check-icon'
                    title='Do you want to complete it?'
                  />
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
