import { isUndef, isNull, isStr } from '@cc-heart/utils';
export function filterFieldFalsy(target: object) {
  return Object.entries(target).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      if (isUndef(value) || isNull(value) || (isStr(value) && value === '')) {
        return acc;
      }
      Reflect.set(acc, key, value);
      return acc;
    },
    {},
  );
}
