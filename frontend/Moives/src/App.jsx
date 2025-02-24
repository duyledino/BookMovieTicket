import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Home'
import Favourite from './Favourite'

function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies/Favourite' element={<Favourite/>}/>
     </Routes>
    </>
  )
}

export default App
