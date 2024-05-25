import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Spin } from 'antd';
import { useParams } from 'react-router-dom';

const Progress = () => {
  const { projectId } = useParams();
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/task/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        });
        setTasksData(response.data.filter(task => task.project === parseInt(projectId, 10)));
      } catch (error) {
        console.error('Error fetching tasks', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  const columns = {
    to_do: 'TO DO',
    in_progress: 'IN PROGRESS',
    code_review: 'CODE REVIEW',
    done: 'DONE',
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={16}>
        {Object.entries(columns).map(([key, title]) => (
          <Col span={6} key={key}>
            <Card title={title} bordered={true}>
              {tasksData
                .filter(task => task.status === key)
                .map(task => (
                  <Card
                    key={task.id}
                    type="inner"
                    title={task.name}
                    style={{ marginBottom: 16 }}
                  >
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>Assigned To:</strong> {task.assigned_to}</p>
                    <p><strong>Project:</strong> {task.project}</p>
                  </Card>
                ))}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Progress;
