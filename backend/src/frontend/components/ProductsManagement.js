import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductsManagement({ storeId }) {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    if (storeId) {
      axios.get(`/api/products/store/${storeId}`)
        .then(response => setProducts(response.data))
        .catch(error => console.error(error));
    }
  }, [storeId]);

  const handleInputChange = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const addProduct = () => {
    axios.post('/api/products/', { storeId, ...newProduct })
      .then(response => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', description: '', price: '' });
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>إدارة المنتجات</h2>

      {/* إضافة منتج جديد */}
      <div>
        <input type="text" name="name" placeholder="اسم المنتج" value={newProduct.name} onChange={handleInputChange} />
        <input type="text" name="description" placeholder="وصف المنتج" value={newProduct.description} onChange={handleInputChange} />
        <input type="number" name="price" placeholder="السعر" value={newProduct.price} onChange={handleInputChange} />
        <button onClick={addProduct}>إضافة منتج</button>
      </div>

      {/* عرض قائمة المنتجات */}
      <h3>المنتجات:</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.price} ريال</li>
        ))}
      </ul>
    </div>
  );
}