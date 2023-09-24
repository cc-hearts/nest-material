import { readFileSync } from 'fs';
import { resolve } from 'path';
import { parse } from 'yaml';
import { ENV } from '../constants';

let config = null;

export function getConfig() {
  if (!config) {
    const env = process.env.NODE_ENV || ENV;
    try {
      const data = readFileSync(resolve(process.cwd(), `app.${env}.yaml`), {
        encoding: 'utf-8',
      });
      if (data) {
        config = parse(data);
      }
    } catch (e) {
      throw new Error('parse yaml error:' + e.toString());
    }
  }

  return config;
}

export const getMysqlConfig = () => {
  const config = getConfig();
  return config.mysql;
};
