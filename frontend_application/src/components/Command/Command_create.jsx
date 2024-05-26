import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Input, Button, Select, notification, Spin } from 'antd';

const { Option } = Select;

const Command_create = () => {
  const [commandsData, setCommandsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [companiesData, setCompaniesData] = useState([]); // Добавить состояние для компаний
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commandsResponse, usersResponse, projectsResponse, companiesResponse] = await Promise.all([
          axios.get('http://127.0.0.1/api/command/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`
            }
          }),
          axios.get('http://127.0.0.1/api/profile/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`
            }
          }),
          axios.get('http://127.0.0.1/api/project/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`
            }
          }),
          axios.get('http://127.0.0.1/api/company/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`
            }
          })
        ]);

        setCommandsData(commandsResponse.data);
        setUsersData(usersResponse.data);
        setProjectsData(projectsResponse.data);
        setCompaniesData(companiesResponse.data); // Сохранить данные о компаниях
      } catch (error) {
        console.error('Error fetching data', error);
        notification.error({ message: 'Error fetching data' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreate = async (values) => {
    setCreating(true);
    try {
      const response = await axios.post(
        'http://127.0.0.1/api/command/',
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        }
      );
      setCommandsData([...commandsData, response.data]);
      notification.success({ message: 'Command created successfully!' });
    } catch (error) {
      console.error('Error creating command', error);
      notification.error({ message: 'Error creating command' });
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div style={{ margin: 'auto', marginTop: '0px', maxWidth: '800px' }}>
      <Card title="Create New Command" style={{ marginBottom: '20px' }}>
        <Form layout="vertical" onFinish={handleCreate}>
          <Form.Item
            name="name"
            label="Command Name"
            rules={[{ required: true, message: 'Please enter the command name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: 'Please select the company' }]}
          >
            <Select placeholder="Select company">
              {companiesData.map(company => (
                <Option key={company.id} value={company.id}>
                  {company.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="users"
            label="Users"
            rules={[{ required: true, message: 'Please select the users' }]}
          >
            <Select mode="multiple" placeholder="Select users">
              {Array.isArray(usersData) && usersData.map(user => (
                <Option key={user.id} value={user.id}>
                  {user.username} ({user.email})
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="projects"
            label="Projects"
            rules={[{ required: true, message: 'Please select the projects' }]}
          >
            <Select mode="multiple" placeholder="Select projects">
              {projectsData.map(project => (
                <Option key={project.id} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={creating}>
              Create Command
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Command_create;
