import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import PrivateRoute from './middlewares/auth'
import Layout from './components/Layout'
import Register from './pages/Register'
import TodoList from './pages/TodoList'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Layout>
            <TodoList />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
