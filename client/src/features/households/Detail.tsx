import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import AddResidentsModal from './AddResidentsModal'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import { WarningFilled } from '@ant-design/icons'
import MembersList from './MembersList'
import { useHouseholdStore } from '~/app/householdStore'

const Detail = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [household, getHouseholdById] = useHouseholdStore(state => [
    state.household,
    state.getHouseholdById
  ])

  useEffect(() => {
    getHouseholdById(id ? id : '1')
  }, [])

  return (
    <HomeLayout>
      <div className="w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader
          title="Thêm mới hộ khẩu"
          type="detail"
          onEdit={() => navigate(`/ho-khau/chinh-sua/${id}`)}
          onDelete={() => {
            showDeleteConfirm({
              title: 'Bạn có chắc chắn muốn xóa hộ khẩu này không?',
              icon: <WarningFilled />,
              onOk: () => {
                navigate(-1)
              }
            })
          }}
        />
        <div className="mb-4 grid h-full auto-rows-max grid-cols-8 items-center justify-center">
          <div className="col-span-3 col-start-3">
            <div className="mt-4 flex  items-center gap-2">
              <p className="basis-1/3">Chủ hộ:</p>
              <p className="grow text-lg">{household.chu_ho.hoTen}</p>
            </div>

            <div className="mt-4 flex  items-center gap-2">
              <p className="basis-1/3">Mã khu vực:</p>
              <p className="grow text-lg">{household.maKhuVuc}</p>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <p className="basis-1/3">Địa chỉ:</p>
              <p className="grow text-lg">{household.diaChi}</p>
            </div>
          </div>
          <div className="col-span-3 col-start-3 flex items-center justify-between gap-2 pt-4">
            <p className="text-xl font-medium">Thành viên hộ khẩu</p>
            <AddResidentsModal />
          </div>
          <div className="col-span-3 col-start-3">
            <MembersList membersList={household.nhan_khaus} />
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default Detail
