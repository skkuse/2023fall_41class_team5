import './App.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContentPage from './pages/ContentPage';
import LoginPage from './pages/LoginPage';
import RecordPage from './pages/RecordPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <div className="App">
      <Routes>
        <Route path='/'  element={<ContentPage/>}></Route>
        <Route path='/login'  element={<LoginPage/>}></Route>
        <Route path='/register'  element={<RegisterPage/>}></Route>
        {/* 기록 페이지 구현하고 element 교체 */}
        <Route path='/record'  element={<RecordPage/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


