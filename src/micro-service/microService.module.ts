import { HttpModule, Module } from '@nestjs/common';
import HttpTrackingConfigFactory from '../tracking/trackingConfig.factory';
import MicroServiceClient from './microService.client';

@Module({
  imports: [
    HttpModule.registerAsync(HttpTrackingConfigFactory.registerOptions),
  ],
  providers: [MicroServiceClient],
  exports: [MicroServiceClient],
})
export default class MicroServiceModule {}
