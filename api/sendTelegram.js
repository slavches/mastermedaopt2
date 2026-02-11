export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, company, phone, volume, message } = req.body;
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;  // ← Из .env
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;      // ← Из .env

    const text = `
🍯 **Новая заявка с сайта!**
👤 **Имя:** ${name}
🏢 **Компания:** ${company || 'Не указана'}
📞 **Телефон:** ${phone}
📦 **Объем:** ${volume}
💬 **Комментарий:** ${message || '-'}
    `.trim();

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: 'Markdown'
        })
      });

      if (response.ok) {
        res.status(200).json({ success: true });
      } else {
        const error = await response.json();
        console.error('Telegram error:', error);
        res.status(500).json({ success: false, error: 'Telegram API error' });
      }
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}