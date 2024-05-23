import React, { useState, useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import Task from './components/task';
import Profile from './components/Profile';
import Login from './components/Loginpage';

const { Header, Content, Sider } = Layout;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsLoggedIn(false);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { key: 'tasks', label: <Link to="/tasks">Your tasks</Link>, breadcrumbName: 'Tasks' },
    { key: 'projects', label: <Link to="/projects">Projects</Link>, breadcrumbName: 'Projects' },
    { key: 'commands', label: <Link to="/commands">Commands</Link>, breadcrumbName: 'Commands' },
    isLoggedIn ? 
      {
        key: 'profile',
        label: <Link to="/profile" style={{ color: '#fff' }}>Profile</Link>,
        breadcrumbName: 'Profile',
        style: { marginLeft: 'auto' }
      } :
      {
        key: 'login',
        label: <Link to="/login" style={{ color: '#fff' }}>Login</Link>,
        breadcrumbName: 'Login',
        style: { marginLeft: 'auto' }
      }
  ];

  const sideMenuItems = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `${key}`,
      icon: React.createElement(icon),
      label: `${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `${subKey}`,
        };
      }),
    };
  });

  const getBreadcrumbName = (path) => {
    const item = menuItems.find((menuItem) => menuItem.key === path);
    return item ? item.breadcrumbName : '';
  };

  const currentPath = location.pathname.split('/')[1] || '';
  const breadcrumbName = getBreadcrumbName(currentPath);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center'}}>
        <a href="/" style={{width: 150, color: '#fff', fontSize: 'xx-large', fontWeight: 'bold', textShadow: '0px 8px #1678ff'}}>Wita.</a>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[currentPath]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0}}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[currentPath]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={sideMenuItems}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{breadcrumbName}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<div style={{ textAlign: 'center', fontSize: '12em', margin: '0px', marginTop: '15%', fontWeight: 'bold', textShadow: '0px 10px #1678ff' }}>Welcome to Wita.</div>} />
              <Route path="/tasks" element={<Task />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
