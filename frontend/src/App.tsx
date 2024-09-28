import './App.css'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pre_login_homepage from './pages/Pre_login_homepage';
import Login_page from './pages/Login_page';
import About_us from './pages/About_us';
import Contact_us from './pages/Contact_us';
import Blogs from './pages/Blogs';
import Seasonal_destinations from './pages/Seasonal_destinations';

const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Pre_login_homepage />} />
        <Route path='/about' element={<About_us />} />
        <Route path='/contact' element={<Contact_us />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/login' element={<Login_page />} />
        <Route path='/seasonal_destinations' element={<Seasonal_destinations/>} />
      </Routes>

    </BrowserRouter>
  )
}

export default App;