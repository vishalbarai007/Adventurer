import './App.css'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pre_login_homepage from './pages/Pre_login_homepage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pre_login_homepage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;