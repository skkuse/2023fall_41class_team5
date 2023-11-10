import './App.css';
import Header from './Content/Header';
import Content from './Content/Content';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <div className="App">
      <Routes>
        <Route path='/'  element={<Content/>}></Route>
        {/* 로그인 페이지 구현하고 element 교체 */}
        <Route path='/login'  element={<Content/>}></Route>
        {/* 회원가입 페이지 구현하고 element 교체 */}
        <Route path='/signup'  element={<Content/>}></Route>
        {/* 기록 페이지 구현하고 element 교체 */}
        <Route path='/record'  element={<Content/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


