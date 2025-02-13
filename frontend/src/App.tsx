import './App.css'
import './index.css'

import './styles/custom-scrollbar.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pre_login_homepage from './pages/Pre_login_homepage';
import Login_page from './pages/Login_page';
import About_us from './pages/About_us';
import Contact_us from './pages/Contact_us';
import Blogs from './pages/Blogs';
import Seasonal_destinations from './pages/destinations';
// import PostLoginHomepage from './pages/Post_Login_Homepage';
import SplashScreen from './components/Developer/main/SplashScreen';
import PostLoginPage from './pages/Post_Login_Homepage';
import TravelTipsPage from './pages/TravelTips';
import ChatBot from './components/Developer/main/ChatBot';
// const LazyComponent = React.lazy(() => import("./Component"));


const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<SplashScreen />} />
        <Route path='/pre-login-homepage' element={<Pre_login_homepage />} />
        <Route path="/post-login-homepage" element={<PostLoginPage />} />
        <Route path='/about' element={<About_us />} />
        <Route path='/contact' element={<Contact_us />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/login' element={<Login_page />} />
        <Route path='/destinations' element={<Seasonal_destinations />} />
        <Route path='/tips' element={<TravelTipsPage />} />
        <Route path='/chatbot' element={<ChatBot />} />


      </Routes>

    </BrowserRouter>
  )
}

export default App;