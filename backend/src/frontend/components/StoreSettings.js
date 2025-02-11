import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StoreSettings({ storeId }) {
  const [settings, setSettings] = useState({ name: '', domain: '', theme: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (storeId) {
      axios.get(`/api/stores/${storeId}/settings`)
        .then(response => {
          setSettings(response.data);
          setLoading(false);
        })
        .catch(error => console.error(error));
    }
  }, [storeId]);

  const handleInputChange = (event) => {
    setSettings({ ...settings, [event.target.name]: event.target.value });
  };

  const saveSettings = () => {
    axios.put(`/api/stores/${storeId}/settings`, settings)
      .then(() => alert('تم حفظ الإعدادات بنجاح!'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>إعدادات المتجر</h2>
      {loading ? <p>جاري التحميل...</p> : (
        <div>
          <label>اسم المتجر:</label>
          <input type="text" name="name" value={settings.name} onChange={handleInputChange} />

          <label>النطاق (الدومين):</label>
          <input type="text" name="domain" value={settings.domain} onChange={handleInputChange} />

          <label>السمة (التصميم):</label>
          <select name="theme" value={settings.theme} onChange={handleInputChange}>
            <option value="default">التصميم الافتراضي</option>
            <option value="modern">التصميم العصري</option>
            <option value="minimal">التصميم البسيط</option>
          </select>

          <button onClick={saveSettings}>حفظ الإعدادات</button>
        </div>
      )}
    </div>
  );
}
