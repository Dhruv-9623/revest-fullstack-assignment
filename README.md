# Revest Full Stack Assignment

This repository contains the implementation of the Full Stack assignment for Revest Solutions.  
The project includes two backend microservices built with **Nest.js** and a frontend built with **Next.js** and **Material UI**.

---

## 📁 Project Structure

```
backend/
  product-service/     → Handles product CRUD
  order-service/       → Handles order CRUD + integrates with product service
frontend/              → Dynamic form generated from JSON schema
```

---

# ⚙️ Backend Setup

There are two independent Nest.js services, each running on separate ports.

---

## 1. Product Service (Port 3001)

### Run:
```
cd backend/product-service
npm install
npm run start:dev
```

### Features:
- Create product  
- Update product  
- Delete product  
- Get all products  
- Get product by ID  

Data is stored using an in-memory array for simplicity.

---

## 2. Order Service (Port 3002)

### Run:
```
cd backend/order-service
npm install
npm run start:dev
```

### Features:
- Create order  
- Update order  
- Delete order  
- Get all orders  
- Get order by ID  

This service communicates with the **Product Service** to:
- Validate product existence  
- Fetch product details  
- Calculate total price (price × quantity)

---

# 🖥️ Frontend Setup (Next.js + Material UI)

### Run:
```
cd frontend
npm install
npm run dev
```

### Features:
- Dynamic signup form generated from a JSON configuration  
- Supports TEXT, LIST, and RADIO field types  
- Validations via React Hook Form  
- Form submission stored in localStorage  

The UI updates automatically when the JSON schema is modified.

---

# 📄 JSON Schema

Schema file:
```
frontend/config/formSchema.json
```

This controls:
- Field labels  
- Field types  
- Required/optional  
- Min/max length  
- Dropdown and radio options  

---

# ▶️ How to Test

### Product Service
- `POST /products` → create product  
- `GET /products` → fetch all products  

### Order Service
- `POST /orders` → requires valid productId  
- Total price = product price × quantity  
- `GET /orders` → returns orders with full product details  

### Frontend
- Open: `http://localhost:3000`  
- Fill the dynamic form  
- Submitted data is stored in localStorage  

---

# ✔️ Notes

- No database is used; both services use in-memory storage.
- Services communicate using REST.
- Code is kept clean and minimal as required for the assignment.

---

# 🙌 Thank You

This completes the assignment.  
I am available for a walkthrough if needed.
