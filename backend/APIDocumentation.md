# 📌 توثيق API مشروع `Dikantek`
🚀 **هذا المستند يحتوي على جميع `API Endpoints` الخاصة بالمشروع وكيفية استخدامها.**

## 🔹 **إدارة المتاجر (Stores API)**
### 📌 **جلب جميع المتاجر الخاصة بالمستخدم**
- **Endpoint:** `GET /api/stores`
- **الوصف:** يعيد جميع المتاجر التي يملكها المستخدم الحالي.

### 📌 **إنشاء متجر جديد**
- **Endpoint:** `POST /api/stores`
- **Body (JSON):**
```json
{
  "name": "متجري الجديد",
  "domain": "myshop.example.com"
}
```
- **الوصف:** ينشئ متجرًا جديدًا للمستخدم.

---

## 🔹 **إدارة المنتجات (Products API)**
### 📌 **جلب المنتجات الخاصة بمتجر معين**
- **Endpoint:** `GET /api/products/store/{storeId}`
- **الوصف:** يجلب جميع المنتجات الخاصة بالمتجر المحدد.

### 📌 **إضافة منتج جديد**
- **Endpoint:** `POST /api/products`
- **Body (JSON):**
```json
{
  "storeId": 1,
  "name": "منتج جديد",
  "description": "وصف المنتج",
  "price": 100.0
}
```
- **الوصف:** يضيف منتجًا جديدًا إلى المتجر.

---

## 🔹 **إدارة الطلبات (Orders API)**
### 📌 **جلب الطلبات الخاصة بمتجر معين**
- **Endpoint:** `GET /api/orders/store/{storeId}`
- **الوصف:** يجلب جميع الطلبات الخاصة بالمتجر المحدد.

### 📌 **إنشاء طلب جديد**
- **Endpoint:** `POST /api/orders`
- **Body (JSON):**
```json
{
  "storeId": 1,
  "customerName": "أحمد",
  "status": "Pending",
  "totalAmount": 200.0
}
```
- **الوصف:** ينشئ طلبًا جديدًا للمتجر.

---

## 🔹 **إدارة المستخدمين (User Management API)**
### 📌 **جلب جميع المستخدمين في متجر معين**
- **Endpoint:** `GET /api/stores/{storeId}/users`
- **الوصف:** يعيد جميع المستخدمين المرتبطين بالمتجر.

### 📌 **إضافة مستخدم جديد إلى المتجر**
- **Endpoint:** `POST /api/stores/{storeId}/users`
- **Body (JSON):**
```json
{
  "email": "user@example.com",
  "role": "manager"
}
```
- **الوصف:** يضيف مستخدمًا جديدًا إلى المتجر مع تحديد دوره.

---

## 🔹 **إدارة الدفع والشحن (Payment & Shipping API)**
### 📌 **جلب إعدادات الدفع والشحن لمتجر معين**
- **Endpoint:** `GET /api/stores/{storeId}/payment-shipping`
- **الوصف:** يعيد جميع إعدادات الدفع والشحن الخاصة بالمتجر.

### 📌 **تحديث إعدادات الدفع والشحن**
- **Endpoint:** `PUT /api/stores/{storeId}/payment-shipping`
- **Body (JSON):**
```json
{
  "paymentGateway": "stripe",
  "shippingProvider": "dhl"
}
```
- **الوصف:** يحدّث إعدادات الدفع والشحن للمتجر.

---

## 🔹 **إدارة العروض والتسويق (Marketing API)**
### 📌 **جلب جميع العروض الخاصة بمتجر معين**
- **Endpoint:** `GET /api/stores/{storeId}/promotions`
- **الوصف:** يعيد جميع العروض الترويجية للمتجر.

### 📌 **إضافة عرض ترويجي جديد**
- **Endpoint:** `POST /api/stores/{storeId}/promotions`
- **Body (JSON):**
```json
{
  "title": "خصم 20%",
  "discount": 20,
  "startDate": "2024-06-01",
  "endDate": "2024-06-15"
}
```
- **الوصف:** يضيف عرضًا ترويجيًا جديدًا إلى المتجر.

---

## 🔹 **إدارة الأمان والصلاحيات (Security & Permissions API)**
### 📌 **جلب جميع الأدوار والصلاحيات لمتجر معين**
- **Endpoint:** `GET /api/stores/{storeId}/roles`
- **الوصف:** يعيد جميع الأدوار والصلاحيات الخاصة بالمتجر.

### 📌 **إضافة دور جديد إلى المتجر**
- **Endpoint:** `POST /api/stores/{storeId}/roles`
- **Body (JSON):**
```json
{
  "name": "Admin",
  "permissions": ["manage_products", "manage_orders"]
}
```
- **الوصف:** يضيف دورًا جديدًا للمستخدمين في المتجر.

---

## 🔹 **الإشعارات والتنبيهات (Notifications API)**
### 📌 **جلب جميع الإشعارات الخاصة بالمتجر**
- **Endpoint:** `GET /api/stores/{storeId}/notifications`
- **الوصف:** يجلب جميع الإشعارات المرتبطة بالمتجر.

---

✅ **تم توثيق جميع `API Endpoints` المهمة!** 🚀