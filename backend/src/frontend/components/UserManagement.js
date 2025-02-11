import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserManagement({ storeId }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', role: 'manager' });

  useEffect(() => {
    if (storeId) {
      axios.get(`/api/stores/${storeId}/users`)
        .then(response => setUsers(response.data))
        .catch(error => console.error(error));
    }
  }, [storeId]);

  const handleInputChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const addUser = () => {
    axios.post(`/api/stores/${storeId}/users`, newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ email: '', role: 'manager' });
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>إدارة المستخدمين</h2>

      {/* إضافة مستخدم جديد */}
      <div>
        <input type="email" name="email" placeholder="البريد الإلكتروني" value={newUser.email} onChange={handleInputChange} />
        <select name="role" value={newUser.role} onChange={handleInputChange}>
          <option value="manager">مدير</option>
          <option value="staff">موظف</option>
        </select>
        <button onClick={addUser}>إضافة مستخدم</button>
      </div>

      {/* عرض قائمة المستخدمين */}
      <h3>المستخدمون:</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
}
