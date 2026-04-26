import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginSignUp from './Pages/LoginSignUp';
import './index.css';
import ToDoPage from './Pages/ToDoPage';
function App() {
  return (
   <BrowserRouter>
   
   <Routes>
    <Route path='/' element={<LoginSignUp/>} />
    <Route path='/todo' element={<ToDoPage/>} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
