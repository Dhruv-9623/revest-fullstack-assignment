# Full-Stack Assignment - Saudi Arabia Company

A complete full-stack application with Nest.js microservices backend and Next.js frontend with dynamic form builder.

## Project Overview

This project consists of:

1. **Backend**: Two independent Nest.js microservices
   - Product Service (Port 3001)
   - Order Service (Port 3002)

2. **Frontend**: Next.js application with dynamic form builder (Port 3000)

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. **Install Product Service dependencies:**
   ```bash
   cd backend/product-service
   npm install
   ```

2. **Install Order Service dependencies:**
   ```bash
   cd backend/order-service
   npm install
   ```

3. **Start Product Service:**
   ```bash
   cd backend/product-service
   npm run start:dev
   ```
   Service runs on: http://localhost:3001

4. **Start Order Service (in a new terminal):**
   ```bash
   cd backend/order-service
   npm run start:dev
   ```
   Service runs on: http://localhost:3002

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Application runs on: http://localhost:3000

## Project Structure

```
.
├── backend/
│   ├── product-service/    # Product microservice
│   │   ├── src/
│   │   │   ├── product/    # Product module
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   └── package.json
│   │
│   ├── order-service/      # Order microservice
│   │   ├── src/
│   │   │   ├── order/      # Order module
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   └── package.json
│   │
│   └── README.md           # Backend documentation
│
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   ├── types/         # TypeScript types
│   │   └── data/          # Form schema
│   ├── package.json
│   └── README.md          # Frontend documentation
│
└── README.md              # This file
```

## Features

### Backend

- ✅ Two independent Nest.js microservices
- ✅ Product Service with full CRUD operations
- ✅ Order Service with full CRUD operations
- ✅ Order Service communicates with Product Service via HTTP
- ✅ Automatic price calculation in Order Service
- ✅ Product validation when creating orders
- ✅ Orders return full product information
- ✅ TypeORM with SQLite databases
- ✅ DTOs for request validation
- ✅ Error handling
- ✅ CORS enabled

### Frontend

- ✅ Next.js 14 with TypeScript
- ✅ Material UI components
- ✅ Dynamic form builder from JSON schema
- ✅ Support for TEXT, LIST (Select), and RADIO fields
- ✅ Form validation (required, minLength, maxLength)
- ✅ React Hook Form integration
- ✅ LocalStorage persistence
- ✅ Responsive design
- ✅ Clean component architecture

## API Endpoints

### Product Service (http://localhost:3001)

- `POST /products` - Create product
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Order Service (http://localhost:3002)

- `POST /orders` - Create order (validates product, calculates price)
- `GET /orders` - Get all orders (with product information)
- `GET /orders/:id` - Get order by ID (with product information)
- `PATCH /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

## Documentation

- [Backend README](./backend/README.md) - Detailed backend documentation
- [Frontend README](./frontend/README.md) - Detailed frontend documentation

## Development

### Running All Services

You'll need three terminal windows:

1. **Terminal 1 - Product Service:**
   ```bash
   cd backend/product-service && npm run start:dev
   ```

2. **Terminal 2 - Order Service:**
   ```bash
   cd backend/order-service && npm run start:dev
   ```

3. **Terminal 3 - Frontend:**
   ```bash
   cd frontend && npm run dev
   ```

### Building for Production

**Backend Services:**
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

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## Testing

### Backend Tests
```bash
# Product Service
cd backend/product-service
npm run test

# Order Service
cd backend/order-service
npm run test
```

## Technologies

### Backend
- Nest.js
- TypeORM
- SQLite
- TypeScript
- class-validator
- class-transformer

### Frontend
- Next.js 14
- React 18
- TypeScript
- Material UI (MUI)
- React Hook Form
- Emotion (CSS-in-JS)

## Notes

- Both backend services use SQLite for simplicity. For production, consider PostgreSQL or MySQL.
- CORS is enabled on both services. Configure specific origins for production.
- Form data is stored in browser localStorage. For production, consider backend storage.
- All code is production-ready with proper error handling, validation, and type safety.

## License

MIT

