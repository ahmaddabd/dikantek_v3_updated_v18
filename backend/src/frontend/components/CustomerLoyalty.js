import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CustomerLoyalty({ storeId }) {
  const [customers, setCustomers] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState({ customerId: '', points: '' });

  useEffect(() => {
    if (storeId) {
      axios.get(`/api/stores/${storeId}/customers`)
        .then(response => setCustomers(response.data))
        .catch(error => console.error(error));
    }
  }, [storeId]);

  const handleInputChange = (event) => {
    setLoyaltyPoints({ ...loyaltyPoints, [event.target.name]: event.target.value });
  };

  const updateLoyaltyPoints = () => {
    axios.post(`/api/stores/${storeId}/customers/${loyaltyPoints.customerId}/loyalty`, { points: loyaltyPoints.points })
      .then(() => alert('تم تحديث نقاط الولاء بنجاح!'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>إدارة العملاء ونظام الولاء</h2>

      {/* اختيار العميل وتحديث نقاط الولاء */}
      <div>
        <label>اختر العميل:</label>
        <select name="customerId" value={loyaltyPoints.customerId} onChange={handleInputChange}>
          <option value="">-- اختر العميل --</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>{customer.name} ({customer.email})</option>
          ))}
        </select>

        <label>عدد النقاط:</label>
        <input type="number" name="points" placeholder="عدد النقاط" value={loyaltyPoints.points} onChange={handleInputChange} />
        
        <button onClick={updateLoyaltyPoints}>تحديث النقاط</button>
      </div>

      {/* عرض قائمة العملاء ونقاط الولاء */}
      <h3>العملاء الحاليون:</h3>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>{customer.name} - {customer.email} - نقاط الولاء: {customer.loyaltyPoints}</li>
        ))}
      </ul>
    </div>
  );
}
