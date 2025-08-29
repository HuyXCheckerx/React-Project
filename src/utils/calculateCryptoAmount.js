// Standalone crypto calculation utility
export const calculateCryptoAmount = async (usdAmount, cryptoTicker) => {
  console.log(`Calculating crypto amount for ${usdAmount} USD in ${cryptoTicker}`);
  
  // Fallback prices - moved to top for immediate access
  const fallbackPrices = {
    'SOL': 100,
    'BTC': 45000,
    'ETH': 2500,
    'BNB': 300,
    'LTC': 70,
    'USDT': 1,
    'TRX': 0.1,
    'TRON': 0.1
  };
  
  // Handle USDT and TRON specially
  if (cryptoTicker === 'USDT') {
    return usdAmount; // 1:1 ratio
  }
  
  if (cryptoTicker === 'TRX' || cryptoTicker === 'TRON') {
    return usdAmount / 0.1; // Approximate TRX price
  }
  
  try {
    // Try to get real-time prices from Binance
    const response = await fetch('https://api.binance.com/api/v3/ticker/price', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) {
      throw new Error(`Binance API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    const priceMap = {
      'SOL': 'SOLUSDT',
      'BTC': 'BTCUSDT', 
      'ETH': 'ETHUSDT',
      'BNB': 'BNBUSDT',
      'LTC': 'LTCUSDT'
    };
    
    const symbol = priceMap[cryptoTicker];
    if (!symbol) {
      console.warn(`Unsupported crypto: ${cryptoTicker}, using fallback`);
      const fallbackPrice = fallbackPrices[cryptoTicker] || 1;
      return usdAmount / fallbackPrice;
    }
    
    const priceData = data.find(item => item.symbol === symbol);
    if (!priceData) {
      console.warn(`Price not found for ${symbol}, using fallback`);
      const fallbackPrice = fallbackPrices[cryptoTicker] || 1;
      return usdAmount / fallbackPrice;
    }
    
    const price = parseFloat(priceData.price);
    const amount = usdAmount / price;
    
    console.log(`${cryptoTicker} real-time price: $${price}, calculated amount: ${amount}`);
    return amount;
    
  } catch (error) {
    console.warn('Failed to fetch real-time prices, using fallback:', error.message);
    
    // Always return a valid fallback calculation - NEVER throw errors
    const fallbackPrice = fallbackPrices[cryptoTicker] || 1;
    const fallbackAmount = usdAmount / fallbackPrice;
    
    console.log(`${cryptoTicker} fallback price: $${fallbackPrice}, calculated amount: ${fallbackAmount}`);
    return fallbackAmount;
  }
};
