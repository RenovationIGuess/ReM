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
import EventList from './features/gift/EventList'
import Temporary from './features/temporary'
import AboutUs from './features/about'
import { ChildrenList } from './features/gift/ChildrenList'
import { StatisticList } from './features/gift/StatisticList'
import { GiftList } from './features/gift/GiftList'
import Create from './features/households/Create'
import Prefetch from './features/auth/Prefetch'
import SplitHousehold from './features/households/Split'
import ItemList from './features/gift/ItemList'
import EditDuocNhanThuong from './features/gift/EditDuocNhanThuong'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="login" element={<Login />} />

        <Route element={<Prefetch />}>
          <Route element={<RequireAuth />}>
            <Route path="nhan-khau">
              <Route index element={<ResidentsList />} />
              <Route path="them" element={<ResidentCreate />} />
              <Route path=":id" element={<ResidentDetail />} />
              <Route path="chinh-sua/:id" element={<ResidentEdit />} />
            </Route>
            <Route index element={<Welcome />} />

            <Route path="ho-khau">
              <Route index element={<HouseHoldsList />} />
              <Route path=":id" element={<HouseholdDetail />} />
              <Route path="chinh-sua/:id" element={<HouseholdEdit />} />
              <Route path="them" element={<Create />} />
              <Route path="tach/:id" element={<SplitHousehold />} />
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

            <Route path="su-kien">
              <Route index element={<EventList />} />
              <Route path=":id" index element={<ChildrenList />} />
              <Route path="thong-ke-ho-khau/:id" index element={<StatisticList />} />
              <Route path="phan-qua/:id" index element={<GiftList />} />
            </Route>

            <Route path='danh-sach-phan-qua'>
              <Route index element={<ItemList />} />
            </Route>

            <Route path="duoc-nhan-qua">
              <Route path="chinh-sua/:id" index element={<EditDuocNhanThuong />} />
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
