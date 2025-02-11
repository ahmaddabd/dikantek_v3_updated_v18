import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrdersManagement({ storeId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (storeId) {
      axios.get(`/api/orders/store/${storeId}`)
        .then(response => setOrders(response.data))
        .catch(error => console.error(error));
    }
  }, [storeId]);

  return (
    <div>
      <h2>إدارة الطلبات</h2>

      {/* عرض قائمة الطلبات */}
      <table border="1">
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>اسم العميل</th>
            <th>الحالة</th>
            <th>المبلغ الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.status}</td>
              <td>{order.totalAmount} ريال</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
