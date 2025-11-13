import { IsUUID, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

