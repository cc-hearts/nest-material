import { join } from 'path';
import { appendFile } from 'fs/promises';
import { validateFilePathOrCreateMkdir } from '../utils/fs';

export interface StreamOptions {
  maxBufferSize: number;
  loggerPath?: string;
}

export class Stream {
  private loggerPath: string;
  private fileName = '';
  private intervalTimer: NodeJS.Timer;
  public isInit = false;
  constructor(
    private readonly options: StreamOptions,
    private content: Buffer[] = [],
  ) {
    this.updateFileName();
    this.loggerPath = options.loggerPath || process.cwd();
    this.startIntervalFlush();
  }

  private updateFileName() {
    const time = new Date().toISOString().split('T')[0];
    this.fileName = `${time}.__logger__.log`;
  }

  public write(message: string) {
    if (!this.isInit) return;
    this.content.push(Buffer.from(message, 'utf8'));
    this.validate();
  }

  private validate() {
    if (this.content.length > this.options.maxBufferSize) {
      // 进行 flush
      this.flush();
    }
  }

  private get FilePath() {
    return join(this.loggerPath, this.fileName);
  }

  private async flush() {
    if (this.content.length === 0) return;

    await validateFilePathOrCreateMkdir(this.FilePath);

    appendFile(this.FilePath, this.content.join('\n'), 'utf-8');
    this.content.length = 0;
  }

  private startIntervalFlush() {
    this.intervalTimer = setInterval(() => {
      this.flush();
    }, 1000);
  }

  private stopIntervalFlush() {
    clearInterval(this.intervalTimer);
  }

  public startLogger() {
    this.isInit = true;
  }
}
