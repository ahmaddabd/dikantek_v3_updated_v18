import React from 'react';
import Link from 'next/link';
import { FaStore, FaBox, FaShoppingCart, FaUsers, FaChartBar, FaCog } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>لوحة التحكم</h2>
      <ul>
        <li><Link href="/"><FaStore /> الرئيسية</Link></li>
        <li><Link href="/products"><FaBox /> المنتجات</Link></li>
        <li><Link href="/orders"><FaShoppingCart /> الطلبات</Link></li>
        <li><Link href="/customers"><FaUsers /> العملاء</Link></li>
        <li><Link href="/reports"><FaChartBar /> التقارير</Link></li>
        <li><Link href="/settings"><FaCog /> الإعدادات</Link></li>
      </ul>
    </div>
  );
}
