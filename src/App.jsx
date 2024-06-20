import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Footer from './components/Footer';
import LandingPage from './components/pages/LandingPage';
import Login from './components/pages/Login';
import About from './components/pages/About';
import { TaskProvider } from './context/store';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import Users from './components/pages/Users';

function App() {
  return (
    <BrowserRouter>
       <TaskProvider> 
          <div className="container">
            <h1>Task Manager</h1>
            <Routes>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/dashboard" element={<Dashboard />} >
                 <Route path="/dashboard/tasks" element={<Home />} />
                 <Route path="/dashboard/users" element={<Users />} />
              </Route>   
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer/>
          </div>
       </TaskProvider>
    </BrowserRouter>
  );
}

export default App