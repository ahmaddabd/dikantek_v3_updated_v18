import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Link from 'next/link';
import ProductsManagement from './ProductsManagement';
import OrdersManagement from './OrdersManagement';
import ReportsAnalytics from './ReportsAnalytics';
import StoreSettings from './StoreSettings';
import UserManagement from './UserManagement';
import PaymentShippingSettings from './PaymentShippingSettings';
import MarketingPromotions from './MarketingPromotions';
import CustomerLoyalty from './CustomerLoyalty';
import SupportHelpCenter from './SupportHelpCenter';
import SecurityPermissions from './SecurityPermissions';
import NotificationsAlerts from './NotificationsAlerts';
import { ProgressBar } from 'react-bootstrap';

export default function Dashboard() {
  const [stores, setStores] = useState([]);
  const [currentStore, setCurrentStore] = useState(null);
  const [setupProgress, setSetupProgress] = useState(0);

  useEffect(() => {
    axios.get('/api/stores')
      .then(response => {
        setStores(response.data);
        if (response.data.length > 0) {
          setCurrentStore(response.data[0]);
        }
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (currentStore) {
      axios.get(`/api/user-theme/${currentStore.id}`)
        .then(response => setSetupProgress(response.data.progress))
        .catch(error => console.error(error));
    }
  }, [currentStore]);

  const handleStoreChange = (event) => {
    const selectedStore = stores.find(store => store.id == event.target.value);
    setCurrentStore(selectedStore);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>لوحة التحكم</h1>

        <label>اختر المتجر:</label>
        <select onChange={handleStoreChange} value={currentStore?.id || ''}>
          {stores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>

        <h2>نسبة إعداد المتجر:</h2>
        <ProgressBar now={setupProgress} label={`${setupProgress}%`} />

        {currentStore && <ProductsManagement storeId={currentStore.id} />}
        {currentStore && <OrdersManagement storeId={currentStore.id} />}
        {currentStore && <ReportsAnalytics storeId={currentStore.id} />}
        {currentStore && <StoreSettings storeId={currentStore.id} />}
        {currentStore && <UserManagement storeId={currentStore.id} />}
        {currentStore && <PaymentShippingSettings storeId={currentStore.id} />}
        {currentStore && <MarketingPromotions storeId={currentStore.id} />}
        {currentStore && <CustomerLoyalty storeId={currentStore.id} />}
        {currentStore && <SupportHelpCenter storeId={currentStore.id} />}
        {currentStore && <SecurityPermissions storeId={currentStore.id} />}
        {currentStore && <NotificationsAlerts storeId={currentStore.id} />}

        <Link href="/orders">إدارة الطلبات</Link>
      </div>
    </div>
  );
}
