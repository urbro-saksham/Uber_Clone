import React, { useContext } from 'react'
import { Start } from './Components/Start'
import { UserLogin } from './User/userLogin'
import { UserRegister } from './User/userRegister'
import { Route, Routes } from 'react-router-dom'
import { CaptainLogin } from './Captain/CaptainLogin'
import { CaptainRegister } from './Captain/captainRegister'
import Home from './Components/UserHome';
import { ProtectedRoute } from './Context/UserProtectedContext'
import { UserDataContext } from './Context/UserContext';
import { UserLogout } from './User/UserLogout';
import { CaptainHome } from './Captain/CaptainHome';

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
            <Route path="/captain-home" element={ <CaptainHome/> } />
            
          </Routes>
    </div>
  )
}

export default App