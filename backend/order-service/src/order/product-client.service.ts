import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductClientService {
  private readonly productServiceUrl: string;

  constructor(private readonly httpService: HttpService) {
    // Product service URL - can be configured via environment variable
    this.productServiceUrl =
      process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';
  }

  /**
   * Fetch a product from product-service by ID
   */
  async getProductById(productId: string): Promise<Product> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<Product>(`${this.productServiceUrl}/products/${productId}`),
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException(
          `Product with ID ${productId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Failed to fetch product from product-service',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}

