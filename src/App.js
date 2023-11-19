import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import CustomerList from './pages/CustomerList'
import CreateCustomer from './pages/CreateCustomer';

function App() {
  return (
    <div className="w-fu min-h-full h-screen flex justify-center py-32 px-4 sm:px-6 lg:px-8">
    <div className="w-full space-y-8">
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/customer" element={<CustomerList/>}/>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/create" element={<CreateCustomer/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App;