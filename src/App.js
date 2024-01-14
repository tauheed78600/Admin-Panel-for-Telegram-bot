import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [blockedUsers1, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/telegram/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleBlockUser = async (chatId) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/telegram/block/${chatId}`);
      await fetchUsers();
    } catch (error) {
      console.error('Error blocking user:', error);
      setLoading(false);
    }
  };

  const handleDeleteUser = async (chatId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/telegram/delete/${chatId}`);
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setLoading(false);
    }
  };

  const blockedUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/telegram/blockedUsers");
      setBlockedUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blocked users:', error);
      setLoading(false);
    }
  };

  const handleUnBlockUser = async (chatId) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/telegram/unBlock/${chatId}`);
      await fetchUsers();
    } catch (error) {
      console.error('Error unblocking user:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Admin Panel for Telegram Weather Update Bot</h1>
      <div className="user-list">
        <h2>Users</h2>
        <button onClick={fetchUsers} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Users'}
        </button>
        {!loading && users.length > 0 && (
          <table>
            {/* Your table headers */}
            <thead>
              <tr>
                <th>ID</th>
                <th>City</th>
                <th>Update Frequency</th>
                <th>Blocked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.chatId}>
                  <td>{user.chatId}</td>
                  <td>{user.city}</td>
                  <td>{user.updateFrequency}</td>
                  <td>{user.blocked ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => handleBlockUser(user.chatId)}>Block</button>
                    <button onClick={() => handleDeleteUser(user.chatId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        <button onClick={blockedUsers} disabled={loading}>
          {loading ? 'Fetching...' : 'Blocked Users'}
        </button>
        {!loading && blockedUsers1.length > 0 && (
          <table>
            {/* Your table headers */}
            <thead>
              <tr>
                <th>ID</th>
                <th>City</th>
                <th>Update Frequency</th>
                <th>Blocked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blockedUsers1.map((user) => (
                <tr key={user.chatId}>
                  <td>{user.chatId}</td>
                  <td>{user.city}</td>
                  <td>{user.updateFrequency}</td>
                  <td>{user.blocked ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => handleUnBlockUser(user.chatId)}>Unblock</button>
                    <button onClick={() => handleDeleteUser(user.chatId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Rest of your admin panel UI */}
    </div>
  );
};

export default AdminPanel;
