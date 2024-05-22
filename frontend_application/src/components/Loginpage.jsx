import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Form, message } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', values);
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      message.success('Login successful!');
    } catch (error) {
      message.error('Login failed!');
    } finally {
      setLoading(false);
    }
  };

  const githubLogin = () => {
    window.location.href = 'http://127.0.0.1:8000/oauth/login/github/';
  };

  return (
    <Form onFinish={onFinish} style={{ maxWidth: '300px', margin: 'auto', marginTop: '10%'}}>
      <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
      <Form.Item>
        <Button icon={<GithubOutlined />} onClick={githubLogin}>
          Login with GitHub
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
