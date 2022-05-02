import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import TrackingService from './tracking.service';

@Injectable()
export default class HttpTrackingConfigFactory
  implements HttpModuleOptionsFactory {
  public static registerOptions = {
    useClass: HttpTrackingConfigFactory,
    inject: [TrackingService],
    extraProviders: [
      {
        provide: 'trackingRequest',
        useClass: TrackingService,
        scope: Scope.REQUEST,
      },
    ],
  };

  constructor(
    @Inject('trackingRequest')
    private readonly trackingService: TrackingService,
    @Inject(REQUEST) private readonly request,
  ) {}

  createHttpOptions(): HttpModuleOptions {
    const reqTraceId = this.request.headers[TrackingService.X_TRACE_ID_KEY];
    const traceId = reqTraceId ?? this.trackingService.getTraceId();
    this.request.headers[TrackingService.X_TRACE_ID_KEY] = traceId;

    return {
      headers: {
        [TrackingService.X_TRACE_ID_KEY]: traceId,
      },
    };
  }
}
