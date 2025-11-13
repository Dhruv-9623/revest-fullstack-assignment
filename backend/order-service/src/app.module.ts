import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { OrderModule } from './order/order.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'order.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // For development only
    }),
    HttpModule,
    OrderModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
