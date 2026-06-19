const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: '32kb' }));

app.post('/api/sendTelegram', async (req, res) => {
  const { name, company, phone, volume, message } = req.body || {};
  const TELEGRAM_TOKEN = process.env.TG_TOKEN;
  const CHAT_ID = process.env.TG_CHAT_ID;

  if (!TELEGRAM_TOKEN || !CHAT_ID) {
    return res.status(500).json({
      success: false,
      error: 'Telegram environment variables are not configured',
    });
  }

  if (!name || !phone || !volume) {
    return res.status(400).json({
      success: false,
      error: 'Required form fields are missing',
    });
  }

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
        parse_mode: 'Markdown',
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    }

    const error = await response.json().catch(() => null);
    console.error('Telegram error:', error || response.statusText);

    return res.status(500).json({
      success: false,
      error: 'Telegram API error',
    });
  } catch (error) {
    console.error('Server error:', error);

    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

app.all('/api/sendTelegram', (req, res) => {
  res.status(405).json({
    success: false,
    error: 'Method not allowed',
  });
});

app.listen(PORT, () => {
  console.log(`Telegram API server is running on port ${PORT}`);
});
