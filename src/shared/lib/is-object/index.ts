export const isObject = (obj: unknown) => (typeof obj === 'object' && obj !== null && !Array.isArray(obj));
