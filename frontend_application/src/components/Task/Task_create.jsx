import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Input, Button, Select, notification, Spin } from 'antd';

const { Option } = Select;

const Task_create = () => {
  const [tasksData, setTasksData] = useState([]);
  const [commandsData, setCommandsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [companiesData, setCompaniesData] = useState([]); // Добавить состояние для компаний
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksResponse, commandsResponse, projectsResponse, usersResponse, companiesResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/task/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`
            }
          }),
          axios.get('http://127.0.0.1:8000/api/command/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`
            }
          }),
          axios.get('http://127.0.0.1:8000/api/project/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`
            }
          }),
          axios.get('http://127.0.0.1:8000/api/profile/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`
            }
          }),
          axios.get('http://127.0.0.1:8000/api/company/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`
            }
          })
        ]);

        setTasksData(tasksResponse.data);
        setCommandsData(commandsResponse.data);
        setProjectsData(projectsResponse.data);
        setUsersData(usersResponse.data);
        setCompaniesData(companiesResponse.data); // Сохранить данные о компаниях
      } catch (error) {
        console.error('Error fetching data', error);
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
        'http://127.0.0.1:8000/api/task/',
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        }
      );
      setTasksData([...tasksData, response.data]);
      notification.success({ message: 'Task created successfully!' });
    } catch (error) {
      console.error('Error creating task', error);
      notification.error({ message: 'Error creating task' });
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div style={{ margin: 'auto', marginTop: '0px', maxWidth: '800px' }}>
      <Card title="Create New Task" style={{ marginBottom: '20px' }}>
        <Form layout="vertical" onFinish={handleCreate}>
          <Form.Item
            name="name"
            label="Task Name"
            rules={[{ required: true, message: 'Please enter the task name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Task Description"
            rules={[{ required: true, message: 'Please enter the task description' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status' }]}
          >
            <Select>
              <Option value={'to_do'}>TO DO</Option>
              <Option value={'in_progress'}>IN PROGRESS</Option>
              <Option value={'code_review'}>CODE REVIEW</Option>
              <Option value={'done'}>DONE</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="command"
            label="Command"
            rules={[{ required: true, message: 'Please select the command' }]}
          >
            <Select placeholder="Select command">
              {commandsData.map(command => (
                <Option key={command.id} value={command.id}>
                  {command.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="project"
            label="Project"
            rules={[{ required: true, message: 'Please select the project' }]}
          >
            <Select placeholder="Select project">
              {projectsData.map(project => (
                <Option key={project.id} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="assigned_to"
            label="Assigned To"
            rules={[{ required: true, message: 'Please select the user to assign to' }]}
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
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={creating}>
              Create Task
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Task_create;

