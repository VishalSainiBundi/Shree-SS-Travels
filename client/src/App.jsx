import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './Pages/Home'
import Page_Route from './Pages/Route'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Page_Route/>
    </>
  )
}

export default App
