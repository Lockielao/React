import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginChanged } from '../features/login'
import VerifyCode from '../components/verifyCode'
import { Form, Input, Button, Checkbox, message, ConfigProvider } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, KeyOutlined } from '@ant-design/icons';
import './Login.css'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let vcode = ''
  useEffect(() => {
    let defaultConfig = {
      prefixCls: 'lockielao',
      theme: {
        primaryColor: '#1890ff',
      },
    }
    let localConfig = localStorage.getItem('globalConfig');
    if (localConfig) {
      defaultConfig = JSON.parse(localConfig)
    }
    ConfigProvider.config(defaultConfig);
  }, [])

  function register() {
    navigate('/home', { replace: true })
  }
  const onFinish = (values) => {
    if (!values.verifyCode || (values.verifyCode !== vcode)) {
      message.error('验证码错误')
      return
    }
    dispatch(loginChanged({ type: 'in', info: values }))
    message.success('登录成功')
    navigate('/home', { replace: true })
  };
  const handleCode = (code) => {
    vcode = code
  }
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
          <Form.Item
            name="verifyCode"
            rules={[{ required: true, message: '请输入验证码' }]}
            style={{ display: 'inline-block', width: '160px' }}
          >
            <Input
              size="large"
              placeholder="验证码"
              allowClear
            />
          </Form.Item>
          <div className="login-code">
            <VerifyCode width="170" height="40" code={handleCode}/>
          </div>
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