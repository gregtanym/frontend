import { useGlobalContext } from "./context";
import { Route, Routes, BrowserRouter } from "react-router-dom"; 
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Form from "./pages/Form";
import Submitted from "./pages/Submitted";
import FormError from "./pages/FormError";
import Edit from "./pages/Edit";

function App() {

  const speech = useGlobalContext()
  return (
    <BrowserRouter> 

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/edit' element={<Edit/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/form' element={<Form/>} />
        <Route path='/formerror' element={<FormError/>} />
        <Route path='/submitted' element={<Submitted/>} />
        <Route path='*' element={<Error/>} />
      </Routes>      
    </BrowserRouter>
  );
}

export default App;
