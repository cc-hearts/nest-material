import type { fn } from '@cc-heart/utils/helper';
const set = new WeakSet<fn>();

/**
 * 白名单鉴权
 */
export const WhitePath = () => {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    set.add(descriptor.value);
  };
};

export function isExistWhitePath(func: fn) {
  return set.has(func);
}
