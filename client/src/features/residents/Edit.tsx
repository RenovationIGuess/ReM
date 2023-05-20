import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, DatePicker, Form, Input, Radio, Select, Space } from 'antd'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import { ExclamationCircleFilled } from '@ant-design/icons'
import UploadImage from '~/components/UploadImage'

const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <HomeLayout>
      <div className="w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader title="Bùi Đức Dũng - 20202020" type="create" />

        <Form className="grid auto-rows-max grid-cols-8 items-center justify-center">
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
            <UploadImage />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="ngaySinh"
            labelCol={{ span: 8 }}
            className="col-span-3 col-start-3"
            rules={[{ required: true, message: 'Ngày sinh không được để trống' }]}
          >
            <DatePicker placeholder="Ngày sinh" style={{ width: '90%' }} />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gioiTinh"
            className="col-span-4"
            rules={[{ required: true, message: 'Giới tính không được để trống' }]}
          >
            <Radio.Group value={0}>
              <Radio value={0}>Nam</Radio>
              <Radio value={1}>Nữ</Radio>
            </Radio.Group>
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
            label="Dân tộc"
            name="danToc"
            labelCol={{ span: 12 }}
            className="col-span-2 col-start-3"
            rules={[{ required: true, message: ' ' }]}
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

          <Form.Item
            label="Tôn giáo"
            name="tonGiao"
            className="col-span-2 ms-2"
            rules={[{ required: true, message: ' ' }]}
          >
            <Select
              showSearch
              placeholder="Tôn giáo"
              optionFilterProp="children"
              options={[
                {
                  value: 'không',
                  label: 'Không'
                },
                {
                  value: 'đạo phật',
                  label: 'Đạo phật'
                },
                {
                  value: 'thiên chúa giáo',
                  label: 'Thiên chúa giáo'
                }
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Địa chỉ thường chú"
            name="diaChiThuongChu"
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

          <Form.Item
            label="Quốc tịch"
            name="quocTich"
            labelCol={{ span: 12 }}
            className="col-span-2 col-start-3"
            rules={[{ required: true, message: ' ' }]}
          >
            <Select
              showSearch
              placeholder="Quốc tịch"
              optionFilterProp="children"
              options={[
                {
                  value: 'việtNam',
                  label: 'Việt Nam'
                },
                {
                  value: 'nhậtBản',
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

          <Form.Item
            label="Trình độ học vấn"
            name="trinhDoHocVan"
            labelCol={{ span: 12 }}
            className="col-span-2 col-start-3"
            rules={[{ required: true, message: ' ' }]}
          >
            <Select
              showSearch
              placeholder="Trình độ học vấn"
              optionFilterProp="children"
              options={[
                {
                  value: 'cấp 3',
                  label: 'cấp 3'
                },
                {
                  value: 'đai học',
                  label: 'Đại học'
                },
                {
                  value: 'cao học',
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
            rules={[{ required: true, message: 'Nơi làm việc không được để trống' }]}
          >
            <Input.TextArea placeholder="Nhập nơi làm việc" />
          </Form.Item>

          <Form.Item
            label="Ghi chú"
            name="ghiChú"
            labelCol={{ span: 6 }}
            className="col-span-4 col-start-3"
          >
            <Input.TextArea placeholder="Nhập ghi chú" />
          </Form.Item>

          <Form.Item className="col-span-8 col-start-6 ms-32">
            <Space>
              <Button
                type="primary"
                htmlType="button"
                className="bg-danger"
                onClick={() =>
                  showDeleteConfirm({
                    title: 'Bạn có chắc chắn muốn hủy chỉnh sửa ?',
                    icon: <ExclamationCircleFilled />,
                    onOk() {
                      navigate(-1)
                    }
                  })
                }
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" className="bg-primary">
                Thêm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </HomeLayout>
  )
}

export default Edit
