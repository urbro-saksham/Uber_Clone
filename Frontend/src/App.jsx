import React from 'react'
import { Home } from './Components/Home'
import { UserLogin } from './User/userLogin'
import { UserRegister } from './User/userRegister'
import { Route, Routes } from 'react-router-dom'
import { CaptainLogin } from './Captain/CaptainLogin'
import { CaptainRegister } from './Captain/captainRegister'

const App = () => {
  return (
    <div>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/userlogin' element={ <UserLogin/> } />
            <Route path='/userregister' element={ <UserRegister />} />
            <Route path='/captainregister' element={ <CaptainRegister />}/>
            <Route path='/captainlogin' element={ <CaptainLogin/> } />
          </Routes>
    </div>
  )
}

export default App