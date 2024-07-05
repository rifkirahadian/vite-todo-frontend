import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import PrivateRoute from './middlewares/auth'
import Layout from './components/Layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Layout>
            <Home />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
