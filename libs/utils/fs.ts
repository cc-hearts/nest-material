import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

export async function validateFilePathOrCreateMkdir(filePath: string) {
  const path = filePath.split('/').slice(0, -1).join('/');
  if (!existsSync(path)) {
    await mkdir(path, { recursive: true });
  }
}
