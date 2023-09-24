import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'fs';
import { compile } from 'handlebars';
import { capitalize } from '@cc-heart/utils';
import { getCommand } from './command';
import { relative, resolve } from 'path';
import * as process from 'process';
import { generatorModulesProvider } from './babel-parse';

const writeProviderFile = async (
  fileDirPath: string,
  filePath: string,
  code: string,
) => {
  await mkdir(fileDirPath, { recursive: true });
  await writeFile(filePath, code, { encoding: 'utf-8' });
};

const shortLine2VariableName = (shortLineArray: string[]) => {
  return shortLineArray.map((_) => capitalize(_)).join('');
};

const writeModuleProviderFile = async (
  fileDirPath: string,
  variable: string,
  importRelativePath: string,
  exportProviderName: string,
) => {
  const moduleName = `${variable}.module.ts`;
  const modulePath = resolve(fileDirPath, '..', moduleName);
  if (existsSync(modulePath)) {
    const sourceCode = await readFile(modulePath, { encoding: 'utf-8' });
    const code = generatorModulesProvider(
      sourceCode,
      `import {${exportProviderName}} from './${importRelativePath}'`,
      exportProviderName,
    );
    if (code) {
      await writeFile(modulePath, code, { encoding: 'utf-8' });
      console.log(`update ${moduleName} file success`);
    }
  }
};

(async () => {
  let dryRun = false,
    isExistsEntity = false;
  const { providerName: variable, pathRoot: originRoot } =
    (await getCommand()) || {};
  const variableName = variable
    .split('-')
    .map((val) => capitalize(val))
    .join('_');
  const pathRoot = resolve(originRoot, variable);
  const providerEntityImportName = shortLine2VariableName(variable.split('-'));
  if (
    existsSync(
      resolve(process.cwd(), pathRoot, `entities/${variable}.entity.ts`),
    )
  ) {
    isExistsEntity = true;
  }
  const providerEntityFileName = variable;
  const providerName = `${variableName}_provider`.toUpperCase();
  const providerNameUpper = providerName;
  const exportName = shortLine2VariableName([
    ...variable.split('-'),
    'provider',
  ]);
  const templateCode = await readFile(
    resolve(__dirname, './template.tmpl.js'),
    {
      encoding: 'utf-8',
    },
  );
  const templateFn = compile(templateCode);
  const code = templateFn({
    providerEntityImportName,
    providerEntityFileName,
    providerName,
    providerNameUpper,
    exportName,
    isExistsEntity,
  });
  const fileDirPath = resolve(process.cwd(), pathRoot, 'providers');
  const filePath = resolve(fileDirPath, `${variable}.provider.ts`);

  if (existsSync(filePath)) {
    dryRun = true;
  }
  if (dryRun) {
    console.log(`dry run generator file path: ${filePath} success`);
  } else {
    let importRelativePath = relative(
      resolve(process.cwd(), pathRoot),
      filePath,
    );
    importRelativePath = importRelativePath.substring(
      0,
      importRelativePath.lastIndexOf('.'),
    );
    await Promise.all([
      writeProviderFile(fileDirPath, filePath, code),
      writeModuleProviderFile(
        fileDirPath,
        variable,
        importRelativePath,
        exportName,
      ),
    ]);
    console.log(`generator file path: ${filePath} success`);
  }
})();
