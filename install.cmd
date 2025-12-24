
import React, { useState } from 'react'

const InputExample = () => {
  const [name, setName] = useState('')

  return (
    <div>
      <input
        type="text"
        value={name}              // 👈 input ki value
        onChange={(e) => setName(e.target.value)} // 👈 update value
        placeholder="Apna naam likho"
      />

      <p>Tumne likha: {name}</p>
    </div>
  )
}

export default InputExample
npm install bcryptjs cookie-parser dotenv express jsonwebtoken mongoose socket.io ejs cors
npm install @google/genai
npm install -D nodemon



Basic Frontend cmd vite

npm create vite@latest

npm install axios   react-dom react-redux react-router-dom 
npm install @reduxjs/toolkit react-redux // This for download create redux toolkit { toolkit dyan rakehe } https://redux-toolkit.js.org/tutorials/quick-start

id - UUID , nano

// Docs  --> jakar quick start me jaksr 
