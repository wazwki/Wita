import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, List, Spin } from 'antd';

const Project = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1/api/project/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        });
        setProjectsData(response.data);
      } catch (error) {
        console.error('Error fetching project data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (!projectsData.length) {
    return <div>No projects available</div>;
  }

  return (
    <div style={{ margin: 'auto', marginTop: '50px', maxWidth: '800px' }}>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={projectsData}
        renderItem={project => (
          <List.Item>
            <Card title={project.name || 'Project'}>
              <p><strong>Name:</strong> {project.name}</p>
              <p><strong>Description:</strong> {project.description}</p>
              <p><strong>Company ID:</strong> {project.company}</p>
              <p><strong>Created By:</strong> {project.created_by}</p>
              <p><strong>Users:</strong></p>
              <List
                dataSource={project.users}
                renderItem={user => (
                  <List.Item key={user.id}>
                    {user.username} ({user.email})
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

export default Project;
