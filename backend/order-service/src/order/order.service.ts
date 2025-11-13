import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductClientService } from './product-client.service';
import { OrderWithProduct } from './interfaces/order-with-product.interface';
import { Product } from './interfaces/product.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private productClientService: ProductClientService,
  ) {}

  /**
   * Create a new order
   * Validates product exists and calculates totalPrice
   */
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Fetch product from product-service
    const product = await this.productClientService.getProductById(
      createOrderDto.productId,
    );

    // Calculate total price
    const totalPrice = product.price * createOrderDto.quantity;

    // Create order
    const order = this.orderRepository.create({
      ...createOrderDto,
      totalPrice,
    });

    return await this.orderRepository.save(order);
  }

  /**
   * Get all orders with product information
   */
  async findAll(): Promise<OrderWithProduct[]> {
    const orders = await this.orderRepository.find({
      order: { createdAt: 'DESC' },
    });

    // Fetch product information for each order
    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const product = await this.productClientService.getProductById(
          order.productId,
        );
        return {
          ...order,
          product,
        };
      }),
    );

    return ordersWithProducts;
  }

  /**
   * Get an order by ID with product information
   */
  async findOne(id: string): Promise<OrderWithProduct> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Fetch product information
    const product = await this.productClientService.getProductById(
      order.productId,
    );

    return {
      ...order,
      product,
    };
  }

  /**
   * Update an order
   * Recalculates totalPrice if productId or quantity changes
   */
  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // If productId or quantity is being updated, recalculate totalPrice
    if (updateOrderDto.productId || updateOrderDto.quantity) {
      const productId = updateOrderDto.productId || order.productId;
      const quantity = updateOrderDto.quantity || order.quantity;

      const product = await this.productClientService.getProductById(productId);
      const totalPrice = product.price * quantity;
      
      // Create update object with calculated totalPrice
      Object.assign(order, {
        ...updateOrderDto,
        totalPrice,
      });
    } else {
      // No recalculation needed, just update with provided fields
      Object.assign(order, updateOrderDto);
    }

    return await this.orderRepository.save(order);
  }

  /**
   * Delete an order
   */
  async remove(id: string): Promise<void> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    await this.orderRepository.remove(order);
  }
}

