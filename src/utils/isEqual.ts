function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

type PlainObject<T = unknown> = {
  [k in string]: T;
};

export function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

export function isArrayOrObject(
  value: unknown
): value is unknown[] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: unknown, rhs: unknown): boolean {
  if (isArray(lhs) && isArray(rhs)) {
    if (lhs.length !== rhs.length) return false;
    for (let i = 0; i < lhs.length; i++) {
      if (!isEqual(lhs[i], rhs[i])) return false;
    }
    return true;
  }

  if (isPlainObject(lhs) && isPlainObject(rhs)) {
    const lhsKeys = Object.keys(lhs);
    const rhsKeys = Object.keys(rhs);

    if (lhsKeys.length !== rhsKeys.length) return false;

    for (const key of lhsKeys) {
      if (!Object.prototype.hasOwnProperty.call(rhs, key)) return false;
      if (!isEqual(lhs[key], rhs[key])) return false;
    }

    return true;
  }

  return lhs === rhs;
}
