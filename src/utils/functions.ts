import * as Crypto from "expo-crypto";

// Custom debounce function
export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
export const generateChatId = async (userId: string, petUserId: string) => {
  const concatenatedIds = [userId, petUserId].sort().join("_");

  const chatId = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    concatenatedIds
  );

  return chatId;
};
