import './App.css'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pre_login_homepage from './pages/Pre_login_homepage';
import Login_page from './pages/Login_page';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pre_login_homepage />} />
        <Route path='/login' element={<Login_page />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;