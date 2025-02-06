import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch users: ' + err.message); // Concatenate the error message
        setLoading(false);
      });
  }, []);

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    width: '250px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
  };

  const cardHoverStyle = {
    ...cardStyle,
    transform: 'scale(1.05)',
  };

  const h3Style = {
    margin: '0',
    fontSize: '1.2em',
    color: '#333',
  };

  const pStyle = {
    margin: '10px 0 0',
    color: '#555',
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <div style={containerStyle}>
        {users.map(user => (
          <div
            key={user._id}
            style={cardStyle}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <h3 style={h3Style}>{user.name}</h3>
            <p style={pStyle}>Email: {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
