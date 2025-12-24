import React, { useState, useRef } from 'react'
import './App.css'

/*
  👉 Fake API data (maan lo backend se aa raha hai)
*/
const FAKE_DATA = [
  'React',
  'Redux',
  'Node.js',
  'Express',
  'MongoDB',
  'JavaScript',
  'TypeScript',
  'Docker',
  'AWS',
  'HTML',
  'CSS',
]

const Search = () => {
  
    // filtered result dikhane ke liye
    const [results, setResults] = useState([])

  const [searchQuery, setSearchQuery] = useState('')

  // debounce timer store karne ke liye
  const debounceRef = useRef(null)

 
// mainly focuse point hae 
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value) // value ko set ki in state serachQuery
    

    // agar pehle se timer chal raha hai to band karo
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // 300ms ruk ke search karo
    debounceRef.current = setTimeout(() => {
      fakeApiCall(value)
    }, 300)
    
  }

// edkar fake API call function huva hae 
  const fakeApiCall = (query) => {

    if (!query) {
      setResults([])
      return
    }

    const filteredData = FAKE_DATA.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    )

    setResults(filteredData)
  }

  // jab user Enter dabaye
  const handleSearchKeyDown = (e) => {
    console.log('Key pressed:', e.key)
    if (e.key === 'Enter') {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
      fakeApiCall(searchQuery)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h3>🔍 Search Technology</h3>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
        placeholder="Type to search..."
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
        }}
      />

      {/* Result List */}
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default Search
