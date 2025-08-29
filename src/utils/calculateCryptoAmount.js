// Standalone crypto calculation utility
export const calculateCryptoAmount = async (usdAmount, cryptoTicker) => {
  try {
    console.log(`Calculating crypto amount for ${usdAmount} USD in ${cryptoTicker}`);
    
    // Handle USDT and TRON specially
    if (cryptoTicker === 'USDT') {
      return usdAmount; // 1:1 ratio
    }
    
    if (cryptoTicker === 'TRX' || cryptoTicker === 'TRON') {
      return usdAmount / 0.1; // Approximate TRX price
    }
    
    const response = await fetch('https://api.binance.com/api/v3/ticker/price');
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
      throw new Error(`Unsupported crypto: ${cryptoTicker}`);
    }
    
    const priceData = data.find(item => item.symbol === symbol);
    if (!priceData) {
      throw new Error(`Price not found for ${symbol}`);
    }
    
    const price = parseFloat(priceData.price);
    const amount = usdAmount / price;
    
    console.log(`${cryptoTicker} price: $${price}, calculated amount: ${amount}`);
    return amount;
    
  } catch (error) {
    console.error('Crypto calculation error:', error);
    // Fallback prices
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
    
    const fallbackPrice = fallbackPrices[cryptoTicker] || 1;
    return usdAmount / fallbackPrice;
  }
};
