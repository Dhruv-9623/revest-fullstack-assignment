import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getInfo() {
    return {
      service: 'Order Service',
      version: '1.0.0',
      endpoints: {
        'GET /orders': 'Get all orders (with product information)',
        'GET /orders/:id': 'Get order by ID (with product information)',
        'POST /orders': 'Create a new order',
        'PUT /orders/:id': 'Update an order',
        'DELETE /orders/:id': 'Delete an order',
      },
      note: 'Order Service communicates with Product Service to validate products and calculate prices.',
      example: {
        createOrder: {
          method: 'POST',
          url: '/orders',
          body: {
            productId: 'uuid-of-product',
            quantity: 2,
          },
          note: 'totalPrice is automatically calculated based on product price',
        },
      },
    };
  }
}

