const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) =>
  obj[key];

const _getKeyValue_ = (key: string) => (obj: Record<string, any>) => obj[key];