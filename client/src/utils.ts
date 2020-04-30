export function toggleBoolean(value: boolean) {
  return !value;
}

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}

export function getRandomElement<T>(elements: T[]): T {
  return elements[Math.floor(Math.random() * elements.length)];
}
