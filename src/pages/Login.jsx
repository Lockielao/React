import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginChanged } from '../features/login'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, KeyOutlined } from '@ant-design/icons';
import './Login.css'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function register() {
    navigate('/home', { replace: true })
  }
  const onFinish = (values) => {
    dispatch(loginChanged({ type: 'in', info: values }))
    message.success('登录成功')
    navigate('/home', { replace: true })
  };
  return (
    <div className="login">
      <div className="login-card">
        <div className="login-title">账号密码登录</div>
        <Form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input
              size="large"
              placeholder="账号"
              allowClear
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              size="large"
              placeholder="密码"
              allowClear
              prefix={<KeyOutlined />}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button block className="login-btn" type="primary" htmlType="submit">登录</Button>
            <Button block className="register-btn" type="text" onClick={() => register()}>注册</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login