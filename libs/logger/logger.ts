import { Injectable, LoggerService } from '@nestjs/common';
import { Stream, StreamOptions } from './stream';
import { useFormatSplitLine } from './hooks';

enum LOGGER_LEVEL {
  LOG = 'log',
  ERROR = 'error',
  WARN = 'warn',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

@Injectable()
export class CustomLogger implements LoggerService {
  private static stream: Stream;
  constructor(
    streamOptions: StreamOptions = { maxBufferSize: 1024 * 1024 * 2 },
  ) {
    if (CustomLogger.stream) return;
    CustomLogger.stream = new Stream(streamOptions);
  }

  static stringifyMessage(
    message: any,
    LEVEL: LOGGER_LEVEL = LOGGER_LEVEL.LOG,
    ...optionalParams: any[]
  ) {
    try {
      const optionalParamsStr = JSON.stringify(optionalParams);
      return `${message} \n  optionalParams: ${optionalParamsStr} \n  LEVEL: ${LEVEL}`;
    } catch (e) {}
    return message;
  }
  log(message: any, ...optionalParams: any[]) {
    CustomLogger.log(message, ...optionalParams);
  }
  static log(message: any, ...optionalParams: any[]) {
    CustomLogger.stream.write(
      useFormatSplitLine(
        CustomLogger.stringifyMessage(
          message,
          LOGGER_LEVEL.LOG,
          optionalParams,
        ),
      ),
    );
  }
  error(message: any, ...optionalParams: any[]) {
    CustomLogger.error(message, ...optionalParams);
  }
  static error(message: any, ...optionalParams: any[]) {
    CustomLogger.stream.write(
      useFormatSplitLine(
        CustomLogger.stringifyMessage(
          message,
          LOGGER_LEVEL.ERROR,
          optionalParams,
        ),
      ),
    );
  }
  static warn(message: any, ...optionalParams: any[]) {
    CustomLogger.stream.write(
      useFormatSplitLine(
        CustomLogger.stringifyMessage(
          message,
          LOGGER_LEVEL.WARN,
          optionalParams,
        ),
      ),
    );
  }
  warn(message: any, ...optionalParams: any[]) {
    CustomLogger.warn(message, ...optionalParams);
  }
  static debug?(message: any, ...optionalParams: any[]) {
    CustomLogger.stream.write(
      useFormatSplitLine(
        CustomLogger.stringifyMessage(
          message,
          LOGGER_LEVEL.DEBUG,
          optionalParams,
        ),
      ),
    );
  }
  debug(message: any, ...optionalParams: any[]) {
    CustomLogger.debug(message, ...optionalParams);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    CustomLogger.verbose(message, ...optionalParams);
  }

  static verbose(message: any, ...optionalParams: any[]) {
    CustomLogger.stream.write(
      useFormatSplitLine(
        CustomLogger.stringifyMessage(
          message,
          LOGGER_LEVEL.DEBUG,
          optionalParams,
        ),
      ),
    );
  }

  startLogger() {
    CustomLogger.stream.startLogger();
  }
}
