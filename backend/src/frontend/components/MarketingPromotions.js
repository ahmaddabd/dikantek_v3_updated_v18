import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MarketingPromotions({ storeId }) {
  const [promotions, setPromotions] = useState([]);
  const [newPromotion, setNewPromotion] = useState({ title: '', discount: '', startDate: '', endDate: '' });

  useEffect(() => {
    if (storeId) {
      axios.get(`/api/stores/${storeId}/promotions`)
        .then(response => setPromotions(response.data))
        .catch(error => console.error(error));
    }
  }, [storeId]);

  const handleInputChange = (event) => {
    setNewPromotion({ ...newPromotion, [event.target.name]: event.target.value });
  };

  const addPromotion = () => {
    axios.post(`/api/stores/${storeId}/promotions`, newPromotion)
      .then(response => {
        setPromotions([...promotions, response.data]);
        setNewPromotion({ title: '', discount: '', startDate: '', endDate: '' });
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>إدارة العروض والتسويق</h2>

      {/* إضافة عرض جديد */}
      <div>
        <input type="text" name="title" placeholder="عنوان العرض" value={newPromotion.title} onChange={handleInputChange} />
        <input type="number" name="discount" placeholder="نسبة الخصم (%)" value={newPromotion.discount} onChange={handleInputChange} />
        <input type="date" name="startDate" value={newPromotion.startDate} onChange={handleInputChange} />
        <input type="date" name="endDate" value={newPromotion.endDate} onChange={handleInputChange} />
        <button onClick={addPromotion}>إضافة العرض</button>
      </div>

      {/* عرض قائمة العروض */}
      <h3>العروض الحالية:</h3>
      <ul>
        {promotions.map(promo => (
          <li key={promo.id}>{promo.title} - {promo.discount}% - من {promo.startDate} إلى {promo.endDate}</li>
        ))}
      </ul>
    </div>
  );
}
