import { Injectable } from '@nestjs/common';
import MicroServiceClient from '../micro-service/microService.client';

@Injectable()
export default class ProductsService {
  constructor(private readonly microServiceClient: MicroServiceClient) {}

  public async list() {
    return this.listProducts();
  }

  async listProducts() {
    return this.microServiceClient.func();
  }
}
