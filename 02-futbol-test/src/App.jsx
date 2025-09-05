import { useState } from 'react'
import './App.css'
import GetInfo from './components/GetInfo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GetInfo />
    </>
  )
}

export default App
