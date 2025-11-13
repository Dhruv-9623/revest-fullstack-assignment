# Backend Services

This directory contains two independent Nest.js microservices:

1. **product-service** - Manages products (CRUD operations)
2. **order-service** - Manages orders (CRUD operations) and communicates with product-service

## Architecture

Both services are independent Nest.js applications that can be run separately. The order-service communicates with product-service via HTTP REST API calls.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- TypeScript

## Project Structure

```
backend/
├── product-service/     # Product microservice
│   ├── src/
│   │   ├── product/     # Product module
│   │   │   ├── entities/
│   │   │   ├── dto/
│   │   │   ├── product.controller.ts
│   │   │   ├── product.service.ts
│   │   │   └── product.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
│
└── order-service/       # Order microservice
    ├── src/
    │   ├── order/       # Order module
    │   │   ├── entities/
    │   │   ├── dto/
    │   │   ├── interfaces/
    │   │   ├── product-client.service.ts
    │   │   ├── order.controller.ts
    │   │   ├── order.service.ts
    │   │   └── order.module.ts
    │   ├── app.module.ts
    │   └── main.ts
    └── package.json
```

## Installation

### Product Service

```bash
cd backend/product-service
npm install
```

### Order Service

```bash
cd backend/order-service
npm install
```

## Running the Services

### Product Service

```bash
cd backend/product-service
npm run start:dev
```

The service will run on **http://localhost:3001**

### Order Service

**Important:** Make sure product-service is running before starting order-service.

```bash
cd backend/order-service
npm run start:dev
```

The service will run on **http://localhost:3002**

You can configure the product-service URL via environment variable:

```bash
PRODUCT_SERVICE_URL=http://localhost:3001 npm run start:dev
```

## API Documentation

### Product Service APIs

Base URL: `http://localhost:3001`

#### Create Product
```http
POST /products
Content-Type: application/json

{
  "name": "Laptop",
  "price": 999.99,
  "stock": 50,
  "category": "Electronics"
}
```

#### Get All Products
```http
GET /products
```

#### Get Product by ID
```http
GET /products/:id
```

#### Update Product
```http
PATCH /products/:id
Content-Type: application/json

{
  "name": "Updated Laptop",
  "price": 899.99,
  "stock": 45,
  "category": "Electronics"
}
```

#### Delete Product
```http
DELETE /products/:id
```

### Order Service APIs

Base URL: `http://localhost:3002`

#### Create Order
```http
POST /orders
Content-Type: application/json

{
  "productId": "uuid-of-product",
  "quantity": 2
}
```

**Note:** The service automatically:
- Validates that the product exists
- Calculates `totalPrice = product.price * quantity`

#### Get All Orders
```http
GET /orders
```

**Response includes full product object:**
```json
[
  {
    "id": "order-uuid",
    "productId": "product-uuid",
    "quantity": 2,
    "totalPrice": 1999.98,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "product": {
      "id": "product-uuid",
      "name": "Laptop",
      "price": 999.99,
      "stock": 50,
      "category": "Electronics",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
]
```

#### Get Order by ID
```http
GET /orders/:id
```

**Response includes full product object**

#### Update Order
```http
PATCH /orders/:id
Content-Type: application/json

{
  "productId": "new-product-uuid",
  "quantity": 3
}
```

**Note:** If `productId` or `quantity` is updated, `totalPrice` is automatically recalculated.

#### Delete Order
```http
DELETE /orders/:id
```

## Database

Both services use SQLite databases for simplicity:
- Product Service: `product.db`
- Order Service: `order.db`

The databases are automatically created when the services start. For production, consider using PostgreSQL, MySQL, or another production-ready database.

## Error Handling

Both services include comprehensive error handling:
- Validation errors (400 Bad Request)
- Not found errors (404 Not Found)
- Service unavailable errors (503 Service Unavailable) - when order-service cannot reach product-service

## CORS

Both services have CORS enabled to allow frontend communication. In production, configure CORS to only allow specific origins.

## Development

### Build for Production

```bash
# Product Service
cd backend/product-service
npm run build
npm run start:prod

# Order Service
cd backend/order-service
npm run build
npm run start:prod
```

### Running Tests

```bash
# Product Service
cd backend/product-service
npm run test

# Order Service
cd backend/order-service
npm run test
```

## Environment Variables

### Product Service
- `PORT` - Server port (default: 3001)

### Order Service
- `PORT` - Server port (default: 3002)
- `PRODUCT_SERVICE_URL` - Product service URL (default: http://localhost:3001)

## Notes

- Both services use TypeORM for database operations
- DTOs (Data Transfer Objects) are used for request validation
- Services follow Nest.js best practices with proper module structure
- All endpoints are RESTful and follow REST conventions

