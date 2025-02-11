import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function NotificationsAlerts({ storeId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (storeId) {
      axios.get(`/api/stores/${storeId}/notifications`)
        .then(response => setNotifications(response.data))
        .catch(error => console.error(error));
    }
  }, [storeId]);

  return (
    <div>
      <h2>الإشعارات والتنبيهات</h2>

      {/* عرض قائمة الإشعارات */}
      <ul>
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <li key={notification.id}>{notification.message} - {notification.date}</li>
          ))
        ) : (
          <p>لا توجد إشعارات حالياً.</p>
        )}
      </ul>
    </div>
  );
}
