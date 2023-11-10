import './App.css';
import Header from './Header';
import Content from './Content';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <div className="App">
      <Routes>
        <Route path='/'  element={<Content/>}></Route>
        <Route path='/login'  element={<Content/>}></Route>
        <Route path='/signup'  element={<Content/>}></Route>
        <Route path='/record'  element={<Content/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


