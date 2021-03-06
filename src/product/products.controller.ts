import { Get, Controller } from '@nestjs/common';
import ProductsService from './products.service';

@Controller('products')
export default class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async listProducts() {
    return this.productsService.list();
  }
}
