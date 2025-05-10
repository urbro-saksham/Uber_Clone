import React, { useContext } from 'react'
import { Start } from './Components/Start'
import { UserLogin } from './User/userLogin'
import { UserRegister } from './User/userRegister'
import { Route, Routes } from 'react-router-dom'
import { CaptainLogin } from './Captain/CaptainLogin'
import { CaptainRegister } from './Captain/captainRegister'
import Home from './Components/Home'
import { ProtectedRoute } from './Context/UserProtectedContext'
import { UserDataContext } from './Context/UserContext'
import { UserLogout } from './User/UserLogout'

const App = () => {

  const ans = useContext(UserDataContext);

  return (
    <div>
          <Routes>

            <Route path='/' element={ <Start /> } />
            <Route path='/userlogin' element={ <UserLogin/> } />
            <Route path='/userregister' element={ <UserRegister />} />
            <Route path='/captainregister' element={ <CaptainRegister />}/>
            <Route path='/captainlogin' element={ <CaptainLogin/> } />
            <Route path='/logout' element={<UserLogout/>}></Route>

            {/* Protected Route */}
            <Route path="/home" element={ <ProtectedRoute> <Home /> </ProtectedRoute>} />
            
          </Routes>
    </div>
  )
}

export default App