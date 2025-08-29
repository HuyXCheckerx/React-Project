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
    orderData.finalTotal || orderData.amount,
    orderData.paymentMethod?.ticker || orderData.currency,
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
export const createSecureUrl = async (baseUrl, orderData) => {
  console.log('Creating secure payment URL with order data:', orderData);
  
  // Enhanced order data with payment details
  const enhancedOrderData = {
    ...orderData,
    paymentAddress: orderData.address,
    cryptoAmount: orderData.cryptoAmount,
    usdAmount: orderData.amount,
    network: orderData.network,
    currency: orderData.currency,
    email: orderData.email || '',
    telegram: orderData.telegramHandle || '',
    orderId: orderData.orderId,
    timestamp: orderData.timestamp
  };
  
  console.log('Enhanced order data:', enhancedOrderData);
  
  const token = createOrderToken(enhancedOrderData);
  const encryptedData = encryptOrderData(enhancedOrderData);
  
  if (!encryptedData) {
    throw new Error('Failed to encrypt order data');
  }
  
  const params = new URLSearchParams({
    data: encryptedData,
    token: token,
    timestamp: Date.now().toString()
  });
  
  const finalUrl = `${baseUrl}?${params.toString()}`;
  console.log('Final secure URL created:', finalUrl);
  
  return finalUrl;
};

/**
 * Get real-time crypto prices from Binance API
 */
const getCryptoPricesFromBinance = async () => {
  try {
    const response = await fetch('https://api.binance.com/api/v3/ticker/price');
    const data = await response.json();
    
    const prices = {};
    data.forEach(item => {
      if (item.symbol === 'SOLUSDT') prices.SOL = parseFloat(item.price);
      if (item.symbol === 'BTCUSDT') prices.BTC = parseFloat(item.price);
      if (item.symbol === 'ETHUSDT') prices.ETH = parseFloat(item.price);
      if (item.symbol === 'BNBUSDT') prices.BNB = parseFloat(item.price);
      if (item.symbol === 'LTCUSDT') prices.LTC = parseFloat(item.price);
      if (item.symbol === 'TRXUSDT') prices.TRX = parseFloat(item.price);
    });
    
    prices.USDT = 1; // USDT is always 1 USD
    prices.TRON = prices.TRX || 0.1; // TRON alias for TRX
    
    console.log('Fetched crypto prices:', prices);
    return prices;
  } catch (error) {
    console.error('Failed to fetch crypto prices from Binance:', error);
    // Fallback prices
    return {
      'SOL': 100,
      'BTC': 45000,
      'ETH': 2500,
      'USDT': 1,
      'BNB': 300,
      'LTC': 70,
      'TRX': 0.1,
      'TRON': 0.1
    };
  }
};

/**
 * Calculate crypto amount from USD using real-time Binance prices
 */
export const calculateCryptoAmount = async (usdAmount, cryptoTicker) => {
  const prices = await getCryptoPricesFromBinance();
  const price = prices[cryptoTicker] || 1;
  return usdAmount / price;
};
