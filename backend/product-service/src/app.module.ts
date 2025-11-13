import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'product.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // For development only
    }),
    ProductModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
