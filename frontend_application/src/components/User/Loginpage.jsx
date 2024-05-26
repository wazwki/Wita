import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Form, message } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1/api/token/', values);
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      localStorage.setItem('user_id', response.data.user_id);
      message.success('Login successful!');
      navigate('/');
    } catch (error) {
      message.error('Login failed!');
    } finally {
      setLoading(false);
    }
  };

  const githubLogin = () => {
    window.location.href = 'http://127.0.0.1/oauth/login/github/';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', backgroundColor: '#041528'}}>
      <h1 style={{ textAlign: 'center', fontSize: '5em', margin: '0px', marginTop: '70px'}}>
        <a href="/" style={{ color: '#fdfdfd', textDecoration: 'none' }}>Wita.</a>
      </h1>
      <h3 style={{ color: '#aaaaaa', textAlign: 'center', fontSize: '1.6em', margin: '0px' }}>-Project Management Tool-</h3>
      <Form
        onFinish={onFinish}
        style={{
          maxWidth: '300px',
          width: '100%',
          paddingRight: '25px',
          paddingTop: '35px',
          paddingBottom: '20px',
          paddingLeft: '25px',
          border: '1px solid #fdfdfd',
          borderRadius: '15px',
          backgroundColor: '#dfdfdf',
          marginTop: '80px'
        }}
      >
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
            <Button type="default" onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </Form.Item>
        <Form.Item>
          <Button icon={<GithubOutlined />} onClick={githubLogin}>
            Login with GitHub
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
