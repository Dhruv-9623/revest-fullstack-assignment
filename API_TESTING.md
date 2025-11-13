# API Testing Guide

## Services Status

- **Product Service**: http://localhost:3001
- **Order Service**: http://localhost:3002
- **Frontend**: http://localhost:3003

## Quick Test Commands

### Product Service APIs

#### 1. Create a Product
```bash
curl -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "price": 999.99,
    "stock": 50,
    "category": "Electronics"
  }'
```

#### 2. Get All Products
```bash
curl http://localhost:3001/products
```

Or open in browser: http://localhost:3001/products

#### 3. Get Product by ID
```bash
curl http://localhost:3001/products/{product-id}
```

#### 4. Update Product
```bash
curl -X PUT http://localhost:3001/products/{product-id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Laptop",
    "price": 899.99,
    "stock": 45,
    "category": "Electronics"
  }'
```

#### 5. Delete Product
```bash
curl -X DELETE http://localhost:3001/products/{product-id}
```

### Order Service APIs

**Note:** Make sure Product Service is running first, and you have a valid product ID.

#### 1. Create an Order
```bash
curl -X POST http://localhost:3002/orders \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "{product-id-from-step-1}",
    "quantity": 2
  }'
```

#### 2. Get All Orders (with product information)
```bash
curl http://localhost:3002/orders
```

Or open in browser: http://localhost:3002/orders

#### 3. Get Order by ID
```bash
curl http://localhost:3002/orders/{order-id}
```

#### 4. Update Order
```bash
curl -X PUT http://localhost:3002/orders/{order-id} \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "{product-id}",
    "quantity": 3
  }'
```

#### 5. Delete Order
```bash
curl -X DELETE http://localhost:3002/orders/{order-id}
```

## Testing in Browser

You can test GET endpoints directly in your browser:

- **Products**: http://localhost:3001/products
- **Orders**: http://localhost:3002/orders

## Using Postman or Thunder Client

1. Import the following collection or create requests manually:

### Product Service
- `POST http://localhost:3001/products`
- `GET http://localhost:3001/products`
- `GET http://localhost:3001/products/:id`
- `PUT http://localhost:3001/products/:id`
- `DELETE http://localhost:3001/products/:id`

### Order Service
- `POST http://localhost:3002/orders`
- `GET http://localhost:3002/orders`
- `GET http://localhost:3002/orders/:id`
- `PUT http://localhost:3002/orders/:id`
- `DELETE http://localhost:3002/orders/:id`

## Complete Test Flow

1. **Start Product Service** (if not running):
   ```bash
   cd backend/product-service
   npm run start:dev
   ```

2. **Start Order Service** (if not running):
   ```bash
   cd backend/order-service
   npm run start:dev
   ```

3. **Create a Product**:
   ```bash
   curl -X POST http://localhost:3001/products \
     -H "Content-Type: application/json" \
     -d '{"name": "Laptop", "price": 999.99, "stock": 50, "category": "Electronics"}'
   ```
   Copy the `id` from the response.

4. **Get All Products**:
   ```bash
   curl http://localhost:3001/products
   ```

5. **Create an Order** (use the product ID from step 3):
   ```bash
   curl -X POST http://localhost:3002/orders \
     -H "Content-Type: application/json" \
     -d '{"productId": "YOUR-PRODUCT-ID", "quantity": 2}'
   ```

6. **Get All Orders** (should include full product information):
   ```bash
   curl http://localhost:3002/orders
   ```

## Troubleshooting

- **Port 3001 in use**: Kill the process using `lsof -ti:3001 | xargs kill -9`
- **Port 3002 in use**: Kill the process using `lsof -ti:3002 | xargs kill -9`
- **Order creation fails**: Make sure Product Service is running and the product ID exists
- **CORS errors**: Both services have CORS enabled, should work from browser

