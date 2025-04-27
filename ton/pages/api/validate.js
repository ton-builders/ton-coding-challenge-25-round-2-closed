import { createHash, createHmac } from 'crypto';
const SECRET_KEY = '7440479953:AAGgL5PY3D37NoLmqMZhdmNMUeek9sKNyWg';
const createCheckString = (data) => {
  const params = new URLSearchParams(data);
  let segments = [];
  for (const [key, value] of params.entries()) {
    if (key !== 'hash' && key !== 'signature') {
      segments.push(`${key}=${value}`);
    }
  }
  return segments.sort().join('\n');
};
const isValidSignature = (initData, givenSignature) => {
  const checkString = createCheckString(initData);
  const hashKey = createHash('sha256').update(SECRET_KEY).digest();
  const calcSignature = createHmac('sha256', hashKey).update(checkString).digest('hex');
  return calcSignature === givenSignature;
};
export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST allowed' });
    return;
  }
  const { initData, signature } = req.body;
  if (!initData || !signature) {
    res.status(400).json({ error: 'initData and signature are required' });
    return;
  }
  if (isValidSignature(initData, signature)) {
    const params = new URLSearchParams(initData);
    const username = params.get('username') || 'Undefined';
    res.status(200).json({ message: 'Valid signature', username });
  } else {
    res.status(400).json({ error: 'Signature is invalid' });
  }
}