import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PaymentShippingSettings({ storeId }) {
  const [settings, setSettings] = useState({ paymentGateway: '', shippingProvider: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (storeId) {
      axios.get(`/api/stores/${storeId}/payment-shipping`)
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
    axios.put(`/api/stores/${storeId}/payment-shipping`, settings)
      .then(() => alert('تم حفظ إعدادات الدفع والشحن بنجاح!'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>إعدادات الدفع والشحن</h2>
      {loading ? <p>جاري التحميل...</p> : (
        <div>
          <label>بوابة الدفع:</label>
          <select name="paymentGateway" value={settings.paymentGateway} onChange={handleInputChange}>
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
            <option value="hyperpay">HyperPay</option>
            <option value="payfort">PayFort</option>
          </select>

          <label>شركة الشحن:</label>
          <select name="shippingProvider" value={settings.shippingProvider} onChange={handleInputChange}>
            <option value="aramex">Aramex</option>
            <option value="smsa">SMSA</option>
            <option value="dhl">DHL</option>
          </select>

          <button onClick={saveSettings}>حفظ الإعدادات</button>
        </div>
      )}
    </div>
  );
}
