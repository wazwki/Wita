import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Input, Button, Select, notification, Spin } from 'antd';

const { Option } = Select;

const Company_create = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsersAndCurrentUser = async () => {
      try {
        const [usersResponse, currentUserResponse] = await Promise.all([
          axios.get('http://127.0.0.1/api/profile/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`
            }
          }),
          axios.get('http://127.0.0.1/api/user/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`
            }
          })
        ]);

        setUsersData(usersResponse.data);
        setCurrentUser(currentUserResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
        notification.error({ message: 'Error fetching data' });
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndCurrentUser();
  }, []);

  const handleCreate = async (values) => {
    setCreating(true);
    try {
      if (!currentUser || !currentUser.id) {
        throw new Error("Current user ID not found");
      }

      const data = {
        ...values,
        created_by: currentUser.id,
      };

      await axios.post(
        'http://127.0.0.1/api/company/',
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        }
      );
      notification.success({ message: 'Company created successfully!' });
    } catch (error) {
      console.error('Error creating company', error);
      notification.error({ message: 'Error creating company' });
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div style={{ margin: 'auto', marginTop: '0px', maxWidth: '800px' }}>
      <Card title="Create New Company" style={{ marginBottom: '20px' }}>
        <Form layout="vertical" onFinish={handleCreate}>
          <Form.Item
            name="name"
            label="Company Name"
            rules={[{ required: true, message: 'Please enter the company name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea />
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
              Create Company
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Company_create;

