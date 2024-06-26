import React, { useState, useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, ProjectOutlined, TeamOutlined, LogoutOutlined, LoginOutlined, PlusOutlined, FormOutlined, MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import Task from './components/Task/Task';
import Task_create from './components/Task/Task_create';
import Project from './components/Project/Project';
import Project_create from './components/Project/Project_create';
import Command from './components/Command/Command';
import Command_create from './components/Command/Command_create';
import Company from './components/Company/Company';
import Company_create from './components/Company/Company_create';
import Profile from './components/User/Profile';
import Login from './components/User/Loginpage';
import Progress from './components/Progress/Progress';
import axios from 'axios';

const { Header, Content, Sider } = Layout;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    setIsLoggedIn(!!accessToken);

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1/api/project/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects', error);
      }
    };

    if (accessToken) {
      fetchProjects();
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  
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
    { key: 'companies', label: <Link to="/companies">Companies</Link>, breadcrumbName: 'Companies' },
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

  const sideMenuItems = [
    {
      key: 'sub1',
      icon: <ProjectOutlined />,
      label: 'Projects',
      children: [
        { key: 'projects', label: <Link to="/projects">View Projects</Link> },
        { key: 'project_create', label: <Link to="/project_create">Create Project</Link>, icon: <PlusOutlined /> },
      ],
    },
    {
      key: 'sub2',
      icon: <TeamOutlined />,
      label: 'Commands',
      children: [
        { key: 'commands', label: <Link to="/commands">View Commands</Link> },
        { key: 'command_create', label: <Link to="/command_create">Create Command</Link>, icon: <PlusOutlined /> },
      ],
    },
    {
      key: 'sub3',
      icon: <FormOutlined />,
      label: 'Tasks',
      children: [
        { key: 'tasks', label: <Link to="/tasks">View Tasks</Link> },
        { key: 'task_create', label: <Link to="/task_create">Create Task</Link>, icon: <PlusOutlined /> },
      ],
    },
    {
      key: 'sub4',
      icon: <ProjectOutlined />,
      label: 'Progress',
      children: projects.map(project => ({
        key: `progress_${project.id}`,
        label: <Link to={`/progress/${project.id}`}>{project.name}</Link>,
      })),
    },
    {
      key: 'sub5',
      icon: <UserOutlined />,
      label: 'Companies',
      children: [
        { key: 'companies', label: <Link to="/companies">View Companies</Link> },
        { key: 'company_create', label: <Link to="/company_create">Create Company</Link>, icon: <PlusOutlined /> },
      ],
    },
    isLoggedIn
      ? {
          key: '4',
          icon: <LogoutOutlined />,
          label: (
            <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Logout
            </span>
          ),
        }
      : {
          key: '5',
          icon: <LoginOutlined />,
          label: <Link to="/login">Login</Link>,
        },
  ];

  const getBreadcrumbName = (path) => {
    const item = menuItems.find((menuItem) => menuItem.key === path);
    return item ? item.breadcrumbName : '';
  };

  const currentPath = location.pathname.split('/')[1] || '';
  const breadcrumbName = getBreadcrumbName(currentPath);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <a href="/" style={{ width: 150, color: '#fff', fontSize: 'xx-large', fontWeight: 'bold', textShadow: '0px 8px #1678ff' }}>Wita.</a>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[currentPath]}
          items={menuItems.filter(item => item.key !== 'project_create' && item.key !== 'command_create' && item.key !== 'task_create' && item.key !== 'company_create')}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
          width={200}
          collapsedWidth={50}
          style={{ background: colorBgContainer, overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
        >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[currentPath]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={sideMenuItems}
          />
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ position: 'absolute', bottom: 10, left: collapsed ? 10 : 60 }}
          >
            {collapsed ? <MenuOutlined /> : <MenuUnfoldOutlined />}
          </Button>
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 50 : 200, padding: '0 24px 24px' }}>
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
              overflow: 'auto',
              maxHeight: 'calc(100vh - 64px - 48px)', // Adjusting height to fit within the layout
            }}
          >
            <Routes>
              <Route path="/" element={<div style={{ textAlign: 'center', fontSize: '12em', margin: '0px', marginTop: '15%', fontWeight: 'bold', textShadow: '0px 10px #1678ff' }}>Welcome to Wita.</div>} />
              <Route path="/tasks" element={<Task />} />
              <Route path="/task_create" element={<Task_create />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/project_create" element={<Project_create />} />
              <Route path="/commands" element={<Command />} />
              <Route path="/command_create" element={<Command_create />} />
              <Route path="/companies" element={<Company />} />
              <Route path="/company_create" element={<Company_create />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
              {projects.map(project => (
                <Route key={project.id} path={`/progress/:projectId`} element={<Progress />} />
              ))}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;

