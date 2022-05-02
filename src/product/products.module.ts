import { Module } from '@nestjs/common';
import MicroServiceModule from '../micro-service/microService.module';
import ProductsController from './products.controller';
import ProductsService from './products.service';

@Module({
  imports: [MicroServiceModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export default class ProductsModule {}
