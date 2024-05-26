import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, List, Spin } from 'antd';

const Task = () => {
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1/api/task/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        });
        setTasksData(response.data);
      } catch (error) {
        console.error('Error fetching task data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (!tasksData.length) {
    return <div>No tasks available</div>;
  }

  return (
    <div style={{ margin: 'auto', marginTop: '50px', maxWidth: '800px' }}>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={tasksData}
        renderItem={task => (
          <List.Item>
            <Card title={task.name || 'Task'}>
              <p><strong>Name:</strong> {task.name}</p>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Command ID:</strong> {task.command}</p>
              <p><strong>Project ID:</strong> {task.project}</p>
              <p><strong>Assigned To:</strong> {task.assigned_to}</p>
              <p><strong>Created By:</strong> {task.created_by}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Task;
