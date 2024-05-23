import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Profile = ({ handleLogout }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const fullName = `${userData.first_name || ''} ${userData.last_name || ''}`.trim();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card title={fullName || 'User Profile'} style={{ margin: 'auto', marginTop: '50px' }}>
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>First name:</strong> {userData.first_name}</p>
        <p><strong>Last name:</strong> {userData.last_name}</p>
      </Card>
      <Button 
        type="primary" 
        onClick={() => {
          handleLogout();
          navigate('/login');
        }} 
        style={{ position: 'absolute', bottom: '40px', right: '40px' }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Profile;
