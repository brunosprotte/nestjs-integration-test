import * as newRelic from 'newrelic';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class TrackingService {
  public static X_TRACE_ID_KEY = 'x-traceid';

  public getTraceId = () => {
    const traceMetadata = newRelic.getTraceMetadata();
    return traceMetadata !== {} && traceMetadata.traceId
      ? traceMetadata.traceId
      : uuidv4();
  };
}
