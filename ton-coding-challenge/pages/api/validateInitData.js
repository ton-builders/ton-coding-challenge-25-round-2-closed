import { createHmac, createHash } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

const botToken = 'YOUR_BOT_TOKEN'; // Замените на настоящий Bot Token

// Функция для проверки подписи, согласно алгоритму Telegram
function validateSignature(initData, signature) {
  const params = new URLSearchParams(initData);
  const paramsObj = {};

  for (const [key, value] of params.entries()) {
    if (key !== 'hash' && key !== 'signature') {
      paramsObj[key] = value;
    }
  }

  const sortedKeys = Object.keys(paramsObj).sort();
  const dataCheckString = sortedKeys
    .map(key => \`\${key}=\${paramsObj[key]}\`)
    .join('\n');

  const secretKey = createHash('sha256').update(botToken).digest();

  const computedHash = createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  return computedHash === signature;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { initData, signature } = req.body;

    if (!initData || !signature) {
      return res.status(400).json({ message: 'Missing initData or signature' });
    }

    const isValid = validateSignature(initData, signature);

    if (isValid) {
      const params = new URLSearchParams(initData);
      const username = params.get('username') || 'Unknown user';
      return res.status(200).json({ message: 'Signature is valid', username });
    } else {
      return res.status(400).json({ message: 'Invalid signature' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
