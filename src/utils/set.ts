import type { Indexed } from "../store/store";

export function set(object: Indexed, path: string, value: unknown): Indexed {
  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const keys = path.split(".");
  let current: Indexed = object;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key] || typeof current[key] !== "object") {
        current[key] = {};
      }
      current = current[key];
    }
  });

  return object;
}
