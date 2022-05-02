import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import ProductsModule from '../src/product/products.module';
import MicroServiceClient from '../src/micro-service/microService.client';
import { ContextIdFactory } from '@nestjs/core';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;
  let msServiceClient;

  beforeAll(async () => {
    const contextId = ContextIdFactory.create();
    jest
      .spyOn(ContextIdFactory, 'getByRequest')
      .mockImplementation(() => contextId);

    const moduleFixture = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();

    msServiceClient = await moduleFixture.resolve(
      MicroServiceClient,
      contextId,
    );

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should mock returned value of msServiceClient.msPost', async () => {
    jest
      .spyOn(msServiceClient, 'msPost')
      .mockResolvedValue({ mockedaValue: 'mocked return' });

    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect({ mockedaValue: 'mocked return' });
  });
});
