/** @format */

import './App.css'

function App() {
  return (
    <div className='App'>
      <h1>My Todo List</h1>
      <div className='todo-wrapper'>
        <div className='input'>
          <div className='input-item'>
            <label>Title</label>
            <input type='text' placeholder='Enter title' />
          </div>
          <div className='input-item'>
            <label>Description</label>
            <input type='text' placeholder='Enter description' />
          </div>
          <div className='input-item'>
            <button type='button' className='primaryBtn'>
              Add Todo
            </button>
          </div>
        </div>
        <div className='btn'>
          <button>TODO</button>
          <button>Completed</button>
        </div>
        <div className='todo-list'>
          <div className='todo-item'>
            <h3>Title</h3>
            <p>Description</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
