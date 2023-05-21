import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'

const Detail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <HomeLayout>
      <div className="w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader
          title="Thêm mới nhân khẩu"
          type="detail"
          onEdit={() => navigate(`/nhan-khau/chinh-sua/${id}`)}
        />
        <div className="mb-4 grid auto-rows-max grid-cols-8 items-center justify-center">
          <div className="col-span-3 col-start-3">
            <div className="flex items-center gap-2">
              <p className="basis-1/3 text-end">Mã nhân khẩu:</p>
              <p className="grow text-lg">20202020</p>
            </div>

            <div className="mt-4 flex  items-center gap-2">
              <p className="basis-1/3 text-end">Họ và tên:</p>
              <p className="grow text-lg">Bùi Đức Dũng</p>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <p className="basis-1/3 text-end">Bí danh:</p>
              <p className="grow text-lg">にゃん〜</p>
            </div>
          </div>

          <div
            className="flex h-[9rem] w-[9rem] items-center justify-center rounded-full 
            border-2 border-dotted border-borderDefault bg-bgDefault transition-all hover:border-primary"
          >
            Cập nhật ảnh
          </div>

          <div className="col-span-4 col-start-3 flex items-center gap-2">
            <p className="basis-1/4 text-end">Ngày sinh:</p>
            <p className="grow text-lg">2002-01-01</p>
          </div>

          <div className="col-span-4 col-start-3 mt-4 flex items-center gap-2">
            <p className="basis-1/4 text-end">Giới tính:</p>
            <p className="grow last:text-lg">Nam</p>
          </div>

          <div className="col-span-4  col-start-3 mt-4 flex items-center gap-2">
            <p className="basis-1/4 text-end">Nơi sinh:</p>
            <p className="grow text-lg">1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội</p>
          </div>

          <div className="col-span-4  col-start-3 mt-4 flex items-center gap-2">
            <p className="basis-1/4 text-end">Nguyên quán:</p>
            <p className="grow text-lg">1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội</p>
          </div>

          <div className="col-span-4  col-start-3 mt-4 flex items-center gap-2">
            <p className="basis-1/4 text-end">Dân tộc:</p>
            <p className="grow text-lg">Kinh</p>
          </div>

          <div className="col-span-4  col-start-3 mt-4 flex items-center gap-2">
            <p className="basis-1/4 text-end">Tôn giáo:</p>
            <p className="grow text-lg">Không</p>
          </div>

          <div className="col-span-4  col-start-3 mt-4 flex items-center gap-2">
            <p className="basis-1/4 text-end">Địa chỉ thường trú:</p>
            <p className="grow text-lg">1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội</p>
          </div>

          <div className="col-span-4  col-start-3 mt-4 flex items-center gap-2">
            <p className="basis-1/4 text-end">Địa chỉ hiện tại:</p>
            <p className="grow text-lg">1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội</p>
          </div>

          <div className="col-span-4  col-start-3 mt-4 flex items-center gap-2">
            <p className="basis-1/4 text-end">Quốc tịch:</p>
            <p className="grow text-lg">Việt Nam</p>
          </div>

          <div className="col-span-4  col-start-3 mt-4 flex items-center gap-2">
            <p className="basis-1/4 text-end">Số hộ chiếu:</p>
            <p className="grow text-lg">123412341234</p>
          </div>

          <div className="col-span-4  col-start-3 mt-4 flex items-center gap-2">
            <p className="basis-1/4 text-end">Trình độ học vấn:</p>
            <p className="grow text-lg">Đại học</p>
          </div>

          <div className="col-span-4  col-start-3 mt-4 flex items-center gap-2">
            <p className="basis-1/4 text-end">Nghề nghiệp:</p>
            <p className="grow text-lg">Coder</p>
          </div>

          <div className="col-span-4  col-start-3 mt-4 flex items-center gap-2">
            <p className="basis-1/4 text-end">Nơi làm việc:</p>
            <p className="grow text-lg">1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội</p>
          </div>

          <div className="col-span-4  col-start-3 mt-4 flex items-center gap-2">
            <p className="basis-1/4 text-end">Ghi chú:</p>
            <p className="grow text-lg">Đối tượng đặc biệt: wibu, fan MU, vozer, coder</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default Detail
