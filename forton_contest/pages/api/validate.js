import { createHash, createHmac } from 'crypto';
const BOT_TOKEN = '7581598649:AAFgMTNm4hJZ2RRCkoN3rLHu4k3ha3UtuoI';
function generateDataString(initData) {
  const params = new URLSearchParams(initData);
  const items = [];
  for (const [key, value] of params.entries()) {
    if (key !== 'hash' && key !== 'signature') {
      items.push(`${key}=${value}`);
    }
  }
  items.sort();
  return items.join('\n');
}
function calculateSignature(dataStr, token) {
  const secretKey = createHash('sha256').update(token).digest();
  return createHmac('sha256', secretKey).update(dataStr).digest('hex');
}
export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { initData, signature } = req.body;
  if (!initData || !signature) {
    res.status(400).json({ error: 'Missing initData or signature' });
    return;
  }
  const dataStr = generateDataString(initData);
  const computedSig = calculateSignature(dataStr, BOT_TOKEN);
  if (computedSig === signature) {
    const params = new URLSearchParams(initData);
    const username = params.get('username') || 'Unknown user';
    res.status(200).json({ message: 'Signature valid', username });
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
}