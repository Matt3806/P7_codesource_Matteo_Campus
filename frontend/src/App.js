import './App.scss';
import { AuthProvider ,RequireAuth} from 'react-auth-kit'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './Pages/Home/Home'
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login'
import Signup from'./Pages/Signup/Signup'
import Notfound from './Pages/Notfound/Notfound';
import Navbar from './Components/Navbar/Navbar';


function App() {

  return (
    <div className="App">
      <AuthProvider 
        authType = {'cookie'}
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={true}>
        <Router>
          <Routes>
            <Route path="/signup" element={< Signup/>} />
            <Route path="/login" element={< Login/>} />
            <Route path="/" element={ 
              <RequireAuth loginPath={'/login'}>
                <Navbar/> 
                < Home/> 
              </RequireAuth>
            }/>
            <Route path="/profil/:id" element={
              <RequireAuth loginPath={'/login'}>
                <Navbar/> 
                <Profile/>
              </RequireAuth>
            }/>
            <Route path="*" element={<Notfound/>}/>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
