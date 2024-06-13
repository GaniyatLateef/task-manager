import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home'
import { TaskProvider } from './context/Store'
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
       <TaskProvider> 
          <div className="container">
            <h1>Task Manager</h1>
            <Home />
            <Footer/>
          </div>
       </TaskProvider>
    </BrowserRouter>
  );
}

export default App