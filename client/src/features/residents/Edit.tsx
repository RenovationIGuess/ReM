import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, DatePicker, Divider, Form, Input, Radio, Select, Space } from 'antd'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons'
import UploadImage, { UploadFile } from '~/components/UploadImage'
import { useResidentsStore } from './residentsStore'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { householdRelationship } from '~/app/config'

const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [
    resident,
    searchHouseholdLeaderResult,
    getResidentById,
    editResident,
    searchHouseholdLeader
  ] = useResidentsStore(state => [
    state.resident,
    state.searchHouseholdLeaderResult,
    state.getResidentById,
    state.editResident,
    state.searchHouseholdLeader
  ])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [image, setImage] = useState<UploadFile | null>(null)

  const onFinish = (values: IResident) => {
    try {
      setIsLoading(true)
      editResident({ ...values, ngaySinh: (values.ngaySinh as any).format('YYYY-MM-DD') })
      // navigate(`/nhan-khau/${id}`)
      toast.success('Cập nhật nhân khẩu thành công', {
        toastId: 'edit-resident-success',
        icon: '👏'
      })
    } catch (error) {
      console.error('==> Toang méo chạy được rồi ><!', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getResidentById(id as string)
  }, [id])

  return (
    <HomeLayout>
      <div className="w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader title={`${resident.hoTen} - ${resident.maNhanKhau}`} type="create" />

        {Object.keys(resident).length === 0 ? (
          <LoadingOutlined className="text-4xl" />
        ) : (
          <Form
            form={form}
            onFinish={onFinish}
            initialValues={{
              maNhanKhau: resident.maNhanKhau,
              hoTen: resident.hoTen,
              biDanh: resident.biDanh ?? '',
              gioiTinh: resident.gioiTinh,
              noiSinh: resident.noiSinh,
              ngaySinh: dayjs(resident.ngaySinh),
              nguyenQuan: resident.nguyenQuan,
              diaChiThuongTru: resident.diaChiThuongTru,
              diaChiHienTai: resident.diaChiHienTai,
              danToc: resident.danToc,
              quocTich: resident.quocTich,
              tonGiao: resident.tonGiao,
              soHoChieu: resident.soHoChieu ?? '',
              trinhDoHocVan: resident.trinhDoHocVan,
              ngheNghiep: resident.ngheNghiep ?? '',
              noiLamViec: resident.noiLamViec ?? '',
              soCMT: resident.chung_minh_thu?.soCMT,
              ngayCap: dayjs(resident.chung_minh_thu?.ngayCap),
              noiCap: resident.chung_minh_thu?.noiCap,
              quanHeVoiChuHo: resident.thanh_vien_ho?.quanHeVoiChuHo,
              idHoKhau: {
                value: resident.thanh_vien_ho?.idHoKhau,
                label: `${resident.thanh_vien_ho?.ho_khau.chu_ho.hoTen} - ${resident.thanh_vien_ho?.ho_khau.maHoKhau}`
              }
            }}
            name="editResident"
            autoComplete="off"
            className="grid auto-rows-max grid-cols-8 items-center justify-center"
          >
            <div className="col-span-3 col-start-3">
              <Form.Item
                label="Mã nhân khẩu"
                name="maNhanKhau"
                labelCol={{ span: 8 }}
                rules={[{ required: true, message: 'Mã nhân khẩu không được để trống' }]}
              >
                <Input placeholder="Nhập mã nhân khẩu" />
              </Form.Item>

              <Form.Item
                label="Họ và tên"
                name="hoTen"
                labelCol={{ span: 8 }}
                rules={[{ required: true, message: 'Họ tên không được để trống' }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>

              <Form.Item label="Bí danh" name="biDanh" labelCol={{ span: 8 }}>
                <Input placeholder="Tên thường gọi" />
              </Form.Item>
            </div>

            <Form.Item className="ms-4">
              <UploadImage image={image} setImage={setImage} />
            </Form.Item>

            <Form.Item
              label="Ngày sinh"
              name="ngaySinh"
              labelCol={{ span: 8 }}
              className="col-span-3 col-start-3"
              rules={[{ required: true, message: 'Ngày sinh không được để trống' }]}
            >
              <DatePicker
                placeholder="Ngày sinh"
                format={'YYYY-MM-DD'}
                disabledDate={current => {
                  return current && current > dayjs().endOf('day')
                }}
                style={{ width: '90%' }}
              />
            </Form.Item>

            <Form.Item
              label="Giới tính"
              name="gioiTinh"
              className="col-span-4"
              rules={[{ required: true, message: 'Giới tính không được để trống' }]}
            >
              <Radio.Group>
                <Radio value={1}>Nam</Radio>
                <Radio value={2}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>

            <Divider className="col-span-4 col-start-3 m-0 pb-4">
              Thông tin căn cước công dân
            </Divider>

            <Form.Item
              label="Số CCCD"
              name="soCMT"
              labelCol={{ span: 6 }}
              className="col-span-4 col-start-3"
              rules={[{ required: true, message: 'Số CCCD không được để trống' }]}
            >
              <Input placeholder="Nhập số CCCD" />
            </Form.Item>

            <Form.Item
              label="Ngày cấp"
              name="ngayCap"
              labelCol={{ span: 6 }}
              className="col-span-4 col-start-3"
              rules={[{ required: true, message: 'Ngày cấp không được để trống' }]}
            >
              <DatePicker
                placeholder="Ngày cấp"
                format={'YYYY-MM-DD'}
                disabledDate={current => {
                  return current && current > dayjs().endOf('day')
                }}
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label="Nơi cấp"
              name="noiCap"
              labelCol={{ span: 6 }}
              className="col-span-4 col-start-3"
              rules={[{ required: true, message: 'Nơi cấp không được để trống' }]}
            >
              <Input placeholder="Nhập nơi cấp" />
            </Form.Item>

            <Divider className="col-span-4 col-start-3 m-0 pb-4">Thông tin nơi ở</Divider>

            <Form.Item
              label="Thành viên hộ khẩu"
              name="idHoKhau"
              labelCol={{ span: 6 }}
              className="col-span-4 col-start-3"
              rules={[{ required: true, message: 'Thành viên hộ khẩu không được để trống' }]}
            >
              <Select
                showSearch
                placeholder="Nhập họ tên người chủ hộ"
                options={Array.from(searchHouseholdLeaderResult)
                  .filter(resident => !resident.chu_ho.duoc_khai_tu)
                  .map(resident => ({
                    label: `${resident.chu_ho.hoTen} - ${resident.maHoKhau}`,
                    value: resident.id
                  }))}
                onSearch={(value: string) => searchHouseholdLeader(value)}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item
              label="Quan hệ với chủ hộ"
              name="quanHeVoiChuHo"
              labelCol={{ span: 6 }}
              className="col-span-4 col-start-3"
              rules={[{ required: true, message: 'Quan hệ với chủ hộ không được để trống' }]}
            >
              <Select
                className="w-2/5"
                placeholder="Quan hệ với chủ hộ"
                showSearch
                options={Object.values(householdRelationship).map(each => ({
                  value: each,
                  label: each
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Nơi sinh"
              name="noiSinh"
              labelCol={{ span: 6 }}
              className="col-span-4 col-start-3"
              rules={[{ required: true, message: 'Nơi sinh không được để trống' }]}
            >
              <Input.TextArea placeholder="Nhập nơi sinh" />
            </Form.Item>

            <Form.Item
              label="Nguyên quán"
              name="nguyenQuan"
              labelCol={{ span: 6 }}
              className="col-span-4 col-start-3"
              rules={[{ required: true, message: 'Nguyên quán không được để trống' }]}
            >
              <Input.TextArea placeholder="Nhập nguyên quán" />
            </Form.Item>

            <Form.Item
              label="Địa chỉ thường trú"
              name="diaChiThuongTru"
              labelCol={{ span: 6 }}
              className="col-span-4 col-start-3"
              rules={[{ required: true, message: 'Địa chỉ thường chú không được để trống' }]}
            >
              <Input.TextArea placeholder="Nhập địa chỉ thường chú" />
            </Form.Item>

            <Form.Item
              label="Địa chỉ hiện tại"
              name="diaChiHienTai"
              labelCol={{ span: 6 }}
              className="col-span-4 col-start-3"
              rules={[{ required: true, message: 'Địa chỉ hiện tại không được để trống' }]}
            >
              <Input.TextArea placeholder="Nhập địa chỉ hiện tại" />
            </Form.Item>

            <Divider className="col-span-4 col-start-3 m-0 pb-4">Thông tin công việc</Divider>

            <Form.Item
              label="Trình độ học vấn"
              name="trinhDoHocVan"
              labelCol={{ span: 12 }}
              className="col-span-2 col-start-3"
            >
              <Select
                showSearch
                placeholder="Trình độ học vấn"
                optionFilterProp="children"
                options={[
                  {
                    value: 'Cấp 3',
                    label: 'Cấp 3'
                  },
                  {
                    value: 'Đai học',
                    label: 'Đại học'
                  },
                  {
                    value: 'Cao học',
                    label: 'Cao học'
                  }
                ]}
              />
            </Form.Item>

            <Form.Item label="Nghề nghiệp" name="ngheNghiep" className="col-span-2 ms-2">
              <Input placeholder="Nhập nghề nghiệp" />
            </Form.Item>

            <Form.Item
              label="Nơi làm việc"
              name="noiLamViec"
              labelCol={{ span: 6 }}
              className="col-span-4 col-start-3"
            >
              <Input.TextArea placeholder="Nhập nơi làm việc" />
            </Form.Item>

            <Divider className="col-span-4 col-start-3 m-0 pb-4">Thông tin khác</Divider>

            <Form.Item
              label="Dân tộc"
              name="danToc"
              labelCol={{ span: 12 }}
              className="col-span-2 col-start-3"
            >
              <Select
                showSearch
                placeholder="Dân tộc"
                optionFilterProp="children"
                options={[
                  {
                    value: 'kinh',
                    label: 'Kinh'
                  },
                  {
                    value: 'tay',
                    label: 'Tay'
                  },
                  {
                    value: 'giao',
                    label: 'Giao'
                  }
                ]}
              />
            </Form.Item>

            <Form.Item label="Tôn giáo" name="tonGiao" className="col-span-2 ms-2">
              <Select
                showSearch
                placeholder="Tôn giáo"
                optionFilterProp="children"
                options={[
                  {
                    value: 'Không',
                    label: 'Không'
                  },
                  {
                    value: 'Đạo phật',
                    label: 'Đạo phật'
                  },
                  {
                    value: 'Thiên chúa giáo',
                    label: 'Thiên chúa giáo'
                  }
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Quốc tịch"
              name="quocTich"
              labelCol={{ span: 12 }}
              className="col-span-2 col-start-3"
            >
              <Select
                showSearch
                placeholder="Quốc tịch"
                optionFilterProp="children"
                options={[
                  {
                    value: 'Việt Nam',
                    label: 'Việt Nam'
                  },
                  {
                    value: 'Nhật Bản',
                    label: 'Nhật Bản'
                  },
                  {
                    value: 'Mỹ',
                    label: 'Mỹ'
                  }
                ]}
              />
            </Form.Item>

            <Form.Item label="Số hộ chiếu" name="soHoChieu" className="col-span-2 ms-2">
              <Input placeholder="Nhập số hộ chiếu" />
            </Form.Item>

            <Form.Item className="col-span-8 col-start-6 ms-32">
              <Space>
                <Button
                  type="primary"
                  htmlType="button"
                  ghost
                  danger
                  onClick={() =>
                    showDeleteConfirm({
                      title: 'Bạn có chắc chắn muốn hủy quá trình ?',
                      icon: <ExclamationCircleFilled />,
                      onOk() {
                        navigate(-1)
                      }
                    })
                  }
                >
                  Hủy
                </Button>
                <Button disabled={isLoading} type="primary" htmlType="submit" ghost>
                  {isLoading ? <LoadingOutlined /> : 'Thêm'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </div>
    </HomeLayout>
  )
}

export default Edit
