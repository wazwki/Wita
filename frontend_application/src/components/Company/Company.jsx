import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Spin, notification } from 'antd';

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/company/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        });
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies', error);
        notification.error({ message: 'Error fetching companies' });
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div style={{ margin: 'auto', marginTop: '0px', maxWidth: '800px' }}>
      <h1>Companies</h1>
      <List
        itemLayout="horizontal"
        dataSource={companies}
        renderItem={company => (
          <List.Item>
            <List.Item.Meta
              title={company.name}
              description={company.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Company;
