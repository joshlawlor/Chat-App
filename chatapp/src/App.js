import './App.css';
import {Route, Routes} from "react-router-dom";


//PAGE IMPORTS:
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Chat from './components/Chat';
import ForgotPassword from './utils/forgotPassword';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/chat' element={<Chat/>}/>
    </Routes>
  );
}

export default App;
