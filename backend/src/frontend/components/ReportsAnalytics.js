import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

export default function ReportsAnalytics({ storeId }) {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    if (storeId) {
      axios.get(`/api/reports/sales?storeId=${storeId}`)
        .then(response => setSalesData(response.data))
        .catch(error => console.error(error));
    }
  }, [storeId]);

  const chartData = {
    labels: salesData.map(item => item.date),
    datasets: [
      {
        label: 'إجمالي المبيعات',
        data: salesData.map(item => item.totalSales),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h2>التقارير والتحليلات</h2>
      <Bar data={chartData} />
    </div>
  );
}
