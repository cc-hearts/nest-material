import * as process from 'process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'path';
import { isObject } from '@cc-heart/utils';

export async function getCommand() {
  const argv = process.argv.slice(2);
  const [providerName] = argv;
  if (!providerName) {
    throw new Error('generator provider template is not name');
  }
  try {
    let nestCliJson: Record<string, unknown> | string = await readFile(
      resolve(process.cwd(), 'nest-cli.json'),
      { encoding: 'utf-8' },
    );
    nestCliJson = JSON.parse(nestCliJson);
    if (isObject(nestCliJson)) {
      const sourceRoot = Reflect.get(nestCliJson, 'sourceRoot') as string;
      const pathRoot = resolve(process.cwd(), sourceRoot);
      return { pathRoot, providerName };
    }
    return null;
  } catch (e) {
    console.log(e);
  }
}
