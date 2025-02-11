import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SecurityPermissions({ storeId }) {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });

  useEffect(() => {
    if (storeId) {
      axios.get(`/api/stores/${storeId}/roles`)
        .then(response => setRoles(response.data))
        .catch(error => console.error(error));

      axios.get(`/api/stores/${storeId}/permissions`)
        .then(response => setPermissions(response.data))
        .catch(error => console.error(error));
    }
  }, [storeId]);

  const handleInputChange = (event) => {
    setNewRole({ ...newRole, [event.target.name]: event.target.value });
  };

  const handlePermissionChange = (event) => {
    const value = event.target.value;
    const updatedPermissions = newRole.permissions.includes(value)
      ? newRole.permissions.filter(p => p !== value)
      : [...newRole.permissions, value];

    setNewRole({ ...newRole, permissions: updatedPermissions });
  };

  const addRole = () => {
    axios.post(`/api/stores/${storeId}/roles`, newRole)
      .then(response => {
        setRoles([...roles, response.data]);
        setNewRole({ name: '', permissions: [] });
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>إدارة الأمان والصلاحيات</h2>

      {/* إضافة دور جديد */}
      <div>
        <input type="text" name="name" placeholder="اسم الدور" value={newRole.name} onChange={handleInputChange} />

        <label>الصلاحيات:</label>
        <div>
          {permissions.map(permission => (
            <label key={permission.id}>
              <input
                type="checkbox"
                value={permission.id}
                checked={newRole.permissions.includes(permission.id)}
                onChange={handlePermissionChange}
              />
              {permission.name}
            </label>
          ))}
        </div>

        <button onClick={addRole}>إضافة الدور</button>
      </div>

      {/* عرض قائمة الأدوار */}
      <h3>الأدوار والصلاحيات:</h3>
      <ul>
        {roles.map(role => (
          <li key={role.id}>{role.name} - الصلاحيات: {role.permissions.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
}
