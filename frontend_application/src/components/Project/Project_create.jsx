import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Input, Button, Select, notification, Spin } from 'antd';

const { Option } = Select;

const Project_create = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [companiesData, setCompaniesData] = useState([]); // Добавить состояние для компаний
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, usersResponse, companiesResponse] = await Promise.all([
          axios.get('http://127.0.0.1/api/project/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`
            }
          }),
          axios.get('http://127.0.0.1/api/profile/', {
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

        setProjectsData(projectsResponse.data);
        setUsersData(usersResponse.data);
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
        'http://127.0.0.1/api/project/',
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        }
      );
      setProjectsData([...projectsData, response.data]);
      notification.success({ message: 'Project created successfully!' });
    } catch (error) {
      console.error('Error creating project', error);
      notification.error({ message: 'Error creating project' });
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div style={{ margin: 'auto', marginTop: '0px', maxWidth: '800px' }}>
      <Card title="Create New Project" style={{ marginBottom: '20px' }}>
        <Form layout="vertical" onFinish={handleCreate}>
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: 'Please enter the project name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Project Description"
            rules={[{ required: true, message: 'Please enter the project description' }]}
          >
            <Input.TextArea />
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
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={creating}>
              Create Project
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Project_create;
