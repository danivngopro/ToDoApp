import './App.css';
import Navbar from './components/Navbar';
import ToDo from './pages/ToDo';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import ForgotPass from './pages/ForgotPass';

function App() {
  return (
    <>
      <Navbar />
      <div className='comp'>
        <Routes>
          <Route path='/' element={<ToDo />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/resetpass' element={<ForgotPass />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
