import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Task from './components/task';
import Login from './components/Loginpage';

const { Header, Content, Sider } = Layout;

const items1 = [
  { key: '1', label: 'Your Tasks' },
  { key: '2', label: 'Projects' },
  { key: '3', label: 'Commands' },
  { 
    key: 'auth', 
    label: <a href="/login" style={{ color: '#fff' }}>Login</a>, 
    style: { marginLeft: 'auto' } 
  } ];

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
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

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center'}}>
        <a href="/" style={{width: 150, color: '#fff', fontSize: 'xx-large', fontWeight: 'bold', textShadow: '0px 8px #1678ff'}}>Wita.</a>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0}}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
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
            <Task />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
