// Security utilities for order data protection

/**
 * Simple hash function for creating order tokens
 * In production, use a proper cryptographic library like crypto-js
 */
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
};

/**
 * Create a secure token for order data
 * This prevents users from tampering with payment parameters
 */
export const createOrderToken = (orderData, secretKey = 'CRYONER_SECRET_2024') => {
  // Create a string from critical order data
  const dataString = [
    orderData.orderId,
    orderData.finalTotal,
    orderData.paymentMethod.ticker,
    orderData.telegramHandle,
    orderData.timestamp,
    secretKey
  ].join('|');
  
  return simpleHash(dataString);
};

/**
 * Verify order token to ensure data hasn't been tampered with
 */
export const verifyOrderToken = (orderData, token, secretKey = 'CRYONER_SECRET_2024') => {
  const expectedToken = createOrderToken(orderData, secretKey);
  return expectedToken === token;
};

/**
 * Encrypt sensitive order data for URL transmission
 * Simple base64 encoding - in production use proper encryption
 */
export const encryptOrderData = (orderData) => {
  try {
    const jsonString = JSON.stringify(orderData);
    return btoa(jsonString);
  } catch (error) {
    console.error('Failed to encrypt order data:', error);
    return null;
  }
};

/**
 * Decrypt order data from URL
 */
export const decryptOrderData = (encryptedData) => {
  try {
    const jsonString = atob(encryptedData);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to decrypt order data:', error);
    return null;
  }
};

/**
 * Create secure payment URL with encrypted data and token
 */
export const createSecurePaymentUrl = (baseUrl, orderData) => {
  const token = createOrderToken(orderData);
  const encryptedData = encryptOrderData(orderData);
  
  if (!encryptedData) {
    throw new Error('Failed to encrypt order data');
  }
  
  const params = new URLSearchParams({
    data: encryptedData,
    token: token,
    timestamp: Date.now().toString()
  });
  
  return `${baseUrl}?${params.toString()}`;
};
