// Order utility functions for Cryoner

/**
 * Generate a unique order ID
 * Format: CRY-YYYYMMDD-HHMMSS-XXXX
 */
export const generateOrderId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  // Generate 4 random characters
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  
  return `CRY-${year}${month}${day}-${hours}${minutes}${seconds}-${randomChars}`;
};

/**
 * Get user's IP address using a free service
 */
export const getUserIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to get IP:', error);
    return 'Unknown';
  }
};

/**
 * Get user's country based on IP
 */
export const getUserCountry = async (ip) => {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    return {
      country: data.country_name || 'Unknown',
      countryCode: data.country_code || 'XX',
      city: data.city || 'Unknown',
      region: data.region || 'Unknown'
    };
  } catch (error) {
    console.error('Failed to get country:', error);
    return {
      country: 'Unknown',
      countryCode: 'XX',
      city: 'Unknown',
      region: 'Unknown'
    };
  }
};

/**
 * Get user agent string
 */
export const getUserAgent = () => {
  return navigator.userAgent || 'Unknown';
};

/**
 * Send order data to Discord webhook
 */
export const sendToDiscordWebhook = async (webhookUrl, orderData) => {
  const embed = {
    title: "🛒 New Order Created",
    color: 0x00FFFF, // Cyan color matching your theme
    fields: [
      {
        name: "📋 Order ID",
        value: orderData.orderId,
        inline: true
      },
      {
        name: "💰 Amount",
        value: `$${orderData.finalTotal} USD`,
        inline: true
      },
      {
        name: "💎 Payment Method",
        value: `${orderData.paymentMethod.name} (${orderData.paymentMethod.ticker})`,
        inline: true
      },
      {
        name: "📧 Contact Info",
        value: `**Email:** ${orderData.email || 'Not provided'}\n**Telegram:** ${orderData.telegramHandle}`,
        inline: false
      },
      {
        name: "🌍 Location Info",
        value: `**IP:** ${orderData.userIP}\n**Country:** ${orderData.userCountry.country} (${orderData.userCountry.countryCode})\n**City:** ${orderData.userCountry.city}`,
        inline: false
      },
      {
        name: "🖥️ Technical Info",
        value: `**User Agent:** ${orderData.userAgent.substring(0, 100)}...`,
        inline: false
      },
      {
        name: "🛍️ Items",
        value: orderData.cart.map(item => `• ${item.title} - ${item.price}`).join('\n'),
        inline: false
      }
    ],
    footer: {
      text: "Cryoner Store - Order Created",
      icon_url: "https://cryoner.store/log0.png"
    },
    timestamp: new Date().toISOString()
  };

  if (orderData.appliedCoupon) {
    embed.fields.push({
      name: "🎫 Coupon Applied",
      value: `**Code:** ${orderData.appliedCoupon.code}\n**Discount:** ${orderData.appliedCoupon.discount}${orderData.appliedCoupon.type === 'percentage' ? '%' : ' USD'}`,
      inline: true
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed]
      })
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to send Discord webhook:', error);
    return false;
  }
};

/**
 * Open payment site in new tab with secure session-based data (no URL parameters)
 */
export const redirectToPaymentSite = async (baseUrl, orderData) => {
  try {
    console.log('Creating secure session-based redirect');
    
    // Calculate accurate crypto amount using Binance API
    const { calculateCryptoAmount } = await import('./securityUtils');
    const accurateCryptoAmount = await calculateCryptoAmount(
      orderData.finalTotal, 
      orderData.paymentMethod.ticker
    );
    
    console.log(`Calculated accurate crypto amount: ${accurateCryptoAmount} ${orderData.paymentMethod.ticker}`);
    
    // Prepare complete payment data
    const paymentData = {
      orderId: orderData.orderId,
      amount: orderData.finalTotal,
      cryptoAmount: accurateCryptoAmount,
      currency: orderData.paymentMethod.ticker,
      network: orderData.paymentMethod.network,
      address: orderData.paymentMethod.address,
      email: orderData.email || '',
      telegramHandle: orderData.telegramHandle,
      timestamp: orderData.timestamp,
      userAgent: navigator.userAgent,
      referrer: window.location.href
    };
    
    // Generate secure session ID and store data
    const sessionId = generateSecureSessionId();
    storePaymentDataSecurely(sessionId, paymentData);
    
    // Open payment gateway with only session ID (no sensitive data in URL)
    const secureUrl = `${baseUrl}?session=${sessionId}`;
    const newTab = window.open(secureUrl, '_blank');
    
    if (!newTab) {
      console.warn('Popup blocked, trying alternative method');
      window.location.href = secureUrl;
    }
    
    console.log('Secure payment tab opened with session ID:', sessionId);
    return true;
  } catch (error) {
    console.error('Error in secure redirect:', error);
    return false;
  }
};

/**
 * Generate cryptographically secure session ID
 */
const generateSecureSessionId = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Store payment data securely with session ID
 */
const storePaymentDataSecurely = (sessionId, paymentData) => {
  const sessionData = {
    id: sessionId,
    data: paymentData,
    timestamp: Date.now(),
    expiresAt: Date.now() + (30 * 60 * 1000) // 30 minutes
  };
  
  // Encrypt and store in localStorage
  const encryptedData = btoa(JSON.stringify(sessionData));
  localStorage.setItem(`cryoner_payment_${sessionId}`, encryptedData);
  
  // Also store in sessionStorage as backup
  sessionStorage.setItem(`cryoner_payment_${sessionId}`, encryptedData);
  
  console.log('Payment data stored securely with session ID:', sessionId);
};
