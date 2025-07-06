// Simple storage utility - can be extended with AsyncStorage later
export const getItem = async <T>(key: string): Promise<T | null> => {
  // For now, return null - will be implemented with AsyncStorage later
  return null;
};

export const setItem = async <T>(key: string, value: T): Promise<void> => {
  // For now, do nothing - will be implemented with AsyncStorage later
  console.log(`Would save ${key}:`, value);
};

export const removeItem = async (key: string): Promise<void> => {
  // For now, do nothing - will be implemented with AsyncStorage later
  console.log(`Would remove ${key}`);
}; 