// StudentDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useClerk } from '@clerk/clerk-react';

const ClerkAPIKey = "pk_test_Y2VudHJhbC1wYXJyb3QtODEuY2xlcmsuYWNjb3VudHMuZGV2JA"; // Vul hier je Clerk API Key in

const getAllUsers = async () => {
  try {
    const response = await axios.get('https://api.clerk.dev/v1/users', {
      headers: {
        'Authorization': `Bearer ${ClerkAPIKey}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.users.map(user => ({
      id: user.id,
      email: user.email_addresses[0]?.email_address,
      name: `${user.first_name || ''} ${user.last_name || ''}`.trim()
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const StudentDashboard = () => {
  const [users, setUsers] = useState([]);
  const { user } = useClerk();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    if (user && user.primaryEmailAddress.emailAddress.endsWith('@student.vives.be')) {  // Controleer of de ingelogde gebruiker student is
      fetchUsers();
    }
  }, [user]);

  return (
    <div>
      <h1>Student Dashboard</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            ID: {user.id}, Name: {user.name}, Email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
