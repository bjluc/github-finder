import React, { useState } from 'react'
import { searchUsers } from './utils/api'
import './App.css'

const Search = ({ onSearch }) => {
  const [text, setText] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    onSearch(text)
    setText('')
  }

  return (
    <form onSubmit={onSubmit} className='search-form'>
      <input
        type='text'
        name='text'
        placeholder='Search Users...'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input type='submit' value='Search' className='btn btn-primary' />
    </form>
  )
}

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (text) => {
    setLoading(true)
    const results = await searchUsers(text)
    setUsers(results)
    setLoading(false)
  }

  return (
    <div className='App'>
      <nav className='navbar'>
        <h1>GitHub Finder</h1>
      </nav>
      <div className='container'>
        <Search onSearch={handleSearch} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='user-grid'>
            {users.map((user) => (
              <a
                key={user.id}
                href={user.html_url}
                target='_blank'
                rel='noopener noreferrer'
                className='user-link'
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className='user-avatar'
                />
                <h3>{user.login}</h3>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
