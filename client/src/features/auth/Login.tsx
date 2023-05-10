import React from 'react'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import { CredentialsType, useLoginMutation } from './authApiSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [login, { isLoading }] = useLoginMutation()

  const onFinish = async (values: CredentialsType) => {
    try {
      const { username, password } = values
      const { accessToken } = await login({ username, password }).unwrap()
      localStorage.setItem('accessToken', accessToken)
      form.resetFields()
      navigate('/')
    } catch (error) {
      const apiError = error as { status: number }
      if (apiError.status === 401) {
        alert('Tên đăng nhập hoặc mật khẩu không đúng.')
      }
    }
  }

  return (
    <DefaultLayout>
      <div className="w-[25vw] rounded-md bg-slate-600 p-4">
        <h6 className="text-center text-3xl font-bold">Đăng nhập</h6>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          className="mt-12 w-full"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Tên đăng nhập không thể bỏ trống.' }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tên đăng nhập"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Mật khẩu không thể bỏ trống.' }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" className="mt-4" block>
              {isLoading ? <LoadingOutlined /> : 'Đăng nhập'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </DefaultLayout>
  )
}
export default Login
