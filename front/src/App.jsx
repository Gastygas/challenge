import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import MainLayout from './components/MainLayout';
import Workers from './screens/workers';
import Dashboard from './screens/dashboard';
import Form from './screens/form';
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/workers' element={<Workers />} />
          <Route path='/form' element={<Form />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
