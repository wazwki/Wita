import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, List, Spin } from 'antd';

const Command = () => {
  const [commandsData, setCommandsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/command/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        });
        setCommandsData(response.data);
      } catch (error) {
        console.error('Error fetching command data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (!commandsData.length) {
    return <div>No commands available</div>;
  }

  return (
    <div style={{ margin: 'auto', marginTop: '50px', maxWidth: '800px' }}>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={commandsData}
        renderItem={command => (
          <List.Item>
            <Card title={command.name || 'Command'}>
              <p><strong>Name:</strong> {command.name}</p>
              <p><strong>Company ID:</strong> {command.company}</p>
              <p><strong>Group ID:</strong> {command.group}</p>
              <p><strong>Users:</strong></p>
              <List
                dataSource={command.users}
                renderItem={user => (
                  <List.Item key={user.id}>
                    {user.username} ({user.email})
                  </List.Item>
                )}
              />
              <p><strong>Projects:</strong></p>
              <List
                dataSource={command.projects}
                renderItem={project => (
                  <List.Item key={project.id}>
                    {project.name}
                  </List.Item>
                )}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Command;
