export function objectMap<TValue, TResult>(
  obj: Record<string, TValue>,
  fn: (value: TValue, key: string, index: number) => TResult,
): Record<string, TResult> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value], index) => [
      key,
      fn(value, key, index),
    ]),
  );
}

