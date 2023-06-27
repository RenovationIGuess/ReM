import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, DatePicker, Divider, Form, Input, Radio, Select, Space } from 'antd'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons'
import UploadImage from '~/components/UploadImage'
import { createResident } from '~/lib/residents'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import { RcFile } from 'antd/es/upload'
import uploadFile from '~/firebase/uploadFile'
import { useResidentsStore } from './residentsStore'
import { householdRelationship } from '~/app/config'

type UploadFile = RcFile & { preview: string }

const Create = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [searchHouseholdLeaderResult, searchHouseholdLeader, getResidents] = useResidentsStore(
    state => [state.searchHouseholdLeaderResult, state.searchHouseholdLeader, state.getResidents]
  )

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [image, setImage] = useState<UploadFile | null>(null)
  const [isMoiSinh, setIsMoiSinh] = useState<boolean>(false)

  const onFinish = async (values: IResident & ResidentHousehold & IdentificationType) => {
    try {
      setIsLoading(true)

      let imageUrl: string | undefined = undefined
      if (image) imageUrl = await uploadFile(image)

      await createResident(
        {
          ...values,
          image: imageUrl,
          ngaySinh: (values.ngaySinh as any).format('YYYY-MM-DD')
        },
        {
          idHoKhau: values.idHoKhau,
          quanHeVoiChuHo: values.quanHeVoiChuHo
        },
        {
          soCMT: values.soCMT,
          ngayCap: values.ngayCap && (values.ngayCap as any).format('YYYY-MM-DD'),
          noiCap: values.noiCap
        },
        isMoiSinh
      )
      getResidents()
      toast.success('Thêm mới nhân khẩu thành công', {
        toastId: 'create-resident-success',
        icon: '👏'
      })
      form.resetFields()
    } catch (error) {
      console.error('==> Toang méo chạy được rồi ><!', error)
      if ((error as any).response?.status === 500) {
        form.setFields([{ name: 'maNhanKhau', errors: ['Mã nhân khẩu đã tồn tại'] }])
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <HomeLayout>
      <div className="w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader title="Thêm mới nhân khẩu" type="create" />

        <Form
          form={form}
          name="createResident"
          autoComplete="off"
          onFinish={onFinish}
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

          <Checkbox
            className="col-span-4 col-start-4 mb-4 mt-2"
            onChange={e => setIsMoiSinh(e.target.checked)}
          >
            Mới sinh
          </Checkbox>

          <Divider className="col-span-4 col-start-3 m-0 pb-4">Thông tin căn cước công dân</Divider>

          <Form.Item
            label="Số CCCD"
            name="soCMT"
            labelCol={{ span: 6 }}
            className="col-span-4 col-start-3"
            rules={[{ required: !isMoiSinh, message: 'Số CCCD không được để trống' }]}
          >
            <Input disabled={isMoiSinh} placeholder="Nhập số CCCD" />
          </Form.Item>

          <Form.Item
            label="Ngày cấp"
            name="ngayCap"
            labelCol={{ span: 6 }}
            className="col-span-4 col-start-3"
            rules={[{ required: !isMoiSinh, message: 'Ngày cấp không được để trống' }]}
          >
            <DatePicker
              placeholder="Ngày cấp"
              disabled={isMoiSinh}
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
            rules={[{ required: !isMoiSinh, message: 'Nơi cấp không được để trống' }]}
          >
            <Input disabled={isMoiSinh} placeholder="Nhập nơi cấp" />
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
              disabled={isMoiSinh}
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
            <Input disabled={isMoiSinh} placeholder="Nhập nghề nghiệp" />
          </Form.Item>

          <Form.Item
            label="Nơi làm việc"
            name="noiLamViec"
            labelCol={{ span: 6 }}
            className="col-span-4 col-start-3"
          >
            <Input.TextArea disabled={isMoiSinh} placeholder="Nhập nơi làm việc" />
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
      </div>
    </HomeLayout>
  )
}

export default Create