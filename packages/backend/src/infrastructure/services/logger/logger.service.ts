import { Injectable, Logger } from '@nestjs/common';
import type { ILogger } from '@domain/services';

@Injectable()
export class LoggerService extends Logger implements ILogger {
  debug(message: string, context = 'Server') {
    if (process.env.NODE_ENV !== 'production') {
      super.debug(`[DEBUG] ${message}`, context);
    }
  }

  log(message: string, context = 'Server') {
    super.log(`[INFO] ${message}`, context);
  }

  error(message: string, context = 'Server', trace?: string) {
    super.error(`[ERROR] ${message}`, trace, context);
  }

  warn(message: string, context = 'Server') {
    super.warn(`[WARN] ${message}`, context);
  }

  verbose(message: string, context = 'Server') {
    if (process.env.NODE_ENV !== 'production') {
      super.verbose(`[VERBOSE] ${message}`, context);
    }
  }
}
