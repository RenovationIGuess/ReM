import { Button, Form, Input } from 'antd'
import { Outlet, Route, Routes } from 'react-router-dom'
import Login from './features/auth/Login'
import RequireAuth from './features/auth/RequireAuth'
import Welcome from './features/users/Welcome'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route index element={<Welcome />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
