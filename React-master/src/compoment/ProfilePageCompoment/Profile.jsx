import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const ProfileCompoment = () => {
  const [user, setUser] = useState(null);
  const { Id } = useParams(); 

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:3002/users/user-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userid: Id })
        });
    
        if (response.ok) {
          const userInfo = await response.json();
          setUser(userInfo);
        } else {
          console.error('Failed to fetch user information');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    if (Id) {
      fetchUserInfo();
    }
  }, [Id]); 

  return (
    <div>
      <h1>Profile Page</h1>
      {user && (
        <div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>
              Welcome, <strong>{user[1]}</strong>!
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>
              Password: 
              <input type="password" value={user[2]}  />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>
              Full Name: 
              <input type="text" value={user[4]}  />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>
              Email: 
              <input type="text" value={user[3]}  />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCompoment;
