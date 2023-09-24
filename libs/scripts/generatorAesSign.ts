import { randomBytes } from 'crypto';

function generatorRandomBytes(count: number, isToString = false) {
  const key = randomBytes(count);
  if (isToString) return key.toString('hex');
  return key;
}

export function generatorKey() {
  return generatorRandomBytes(32, true);
}

export function generatorIv() {
  return generatorRandomBytes(16, true);
}

generatorAesSign();

function generatorAesSign() {
  const key = generatorKey();
  const iv = generatorIv();
  console.log('key:', key);
  console.log('iv:', iv);
}
