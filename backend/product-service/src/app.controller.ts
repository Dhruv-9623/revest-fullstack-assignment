import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getInfo() {
    return {
      service: 'Product Service',
      version: '1.0.0',
      endpoints: {
        'GET /products': 'Get all products',
        'GET /products/:id': 'Get product by ID',
        'POST /products': 'Create a new product',
        'PUT /products/:id': 'Update a product',
        'DELETE /products/:id': 'Delete a product',
      },
      example: {
        createProduct: {
          method: 'POST',
          url: '/products',
          body: {
            name: 'Laptop',
            price: 999.99,
            stock: 50,
            category: 'Electronics',
          },
        },
      },
    };
  }
}

