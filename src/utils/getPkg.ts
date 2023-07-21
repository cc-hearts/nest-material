// getPkg 获取package.json 中的数据
import { readFileSync } from 'fs';
import { resolve } from "path";
import * as process from "process";

export function getPkg() {
  const pkg = readFileSync(resolve(process.cwd(), "package.json"), {
    encoding: "utf-8"
  });
  return JSON.parse(pkg);
}
