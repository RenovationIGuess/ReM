import { Button, Form, Input } from 'antd'
import { Outlet, Route, Routes } from 'react-router-dom'
import Login from './features/auth/Login'
import RequireAuth from './features/auth/RequireAuth'
import Welcome from './features/users/Welcome'
import ResidentsList from './features/residents/List'
import ResidentCreate from './features/residents/Create'
import ResidentDetail from './features/residents/Detail'
import ResidentEdit from './features/residents/Edit'
import HouseHoldsList from './features/households/List'
import HouseholdDetail from './features/households/Detail'
import HouseholdEdit from './features/households/Edit'
import Gift from './features/gift'
import Temporary from './features/temporary'
import AboutUs from './features/about'
import Create from './features/households/Create'
import Prefetch from './features/auth/Prefetch'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="login" element={<Login />} />

        <Route element={<Prefetch />}>
          <Route path="nhan-khau">
            <Route index element={<ResidentsList />} />
            <Route path="them" element={<ResidentCreate />} />
            <Route path=":id" element={<ResidentDetail />} />
            <Route path="chinh-sua/:id" element={<ResidentEdit />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route index element={<Welcome />} />

            <Route path="ho-khau">
              <Route index element={<HouseHoldsList />} />
              <Route path=":id" element={<HouseholdDetail />} />
              <Route path="chinh-sua/:id" element={<HouseholdEdit />} />
              <Route path="them" element={<Create />} />
            </Route>

            <Route path="nhan-khau">
              <Route index element={<ResidentsList />} />
              <Route path="them" element={<ResidentCreate />} />
              <Route path=":id" element={<ResidentDetail />} />
              <Route path="chinh-sua/:id" element={<ResidentEdit />} />
            </Route>

            <Route path="tam-tru">
              <Route index element={<Temporary />} />
            </Route>

            <Route path="tang-qua">
              <Route index element={<Gift />} />
            </Route>

            <Route path="thong-tin">
              <Route index element={<AboutUs />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
