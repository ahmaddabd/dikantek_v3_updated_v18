import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SupportHelpCenter({ storeId }) {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ subject: '', message: '' });

  useEffect(() => {
    if (storeId) {
      axios.get(`/api/stores/${storeId}/support`)
        .then(response => setTickets(response.data))
        .catch(error => console.error(error));
    }
  }, [storeId]);

  const handleInputChange = (event) => {
    setNewTicket({ ...newTicket, [event.target.name]: event.target.value });
  };

  const createTicket = () => {
    axios.post(`/api/stores/${storeId}/support`, newTicket)
      .then(response => {
        setTickets([...tickets, response.data]);
        setNewTicket({ subject: '', message: '' });
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>مركز الدعم والمساعدة</h2>

      {/* إنشاء تذكرة دعم جديدة */}
      <div>
        <input type="text" name="subject" placeholder="موضوع التذكرة" value={newTicket.subject} onChange={handleInputChange} />
        <textarea name="message" placeholder="وصف المشكلة" value={newTicket.message} onChange={handleInputChange}></textarea>
        <button onClick={createTicket}>إرسال التذكرة</button>
      </div>

      {/* عرض قائمة التذاكر */}
      <h3>التذاكر المفتوحة:</h3>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>{ticket.subject} - {ticket.status}</li>
        ))}
      </ul>
    </div>
  );
}
