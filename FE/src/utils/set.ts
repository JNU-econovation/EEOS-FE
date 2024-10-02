export const updateSet = <T>(set: Set<T>, value: T): Set<T> => {
  const newSet = new Set(set);
  set.has(value) ? newSet.delete(value) : newSet.add(value);
  return newSet;
};
