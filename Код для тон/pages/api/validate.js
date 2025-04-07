import { createHash, createHmac } from 'crypto';
const BOT_SECRET = '7643806345:AAGMwqDFv6f89wgyFsStwTtRJmCrSKVAAlY';
const sortAndConcat = (queryString) => {
  const params = new URLSearchParams(queryString);
  let parts = [];
  for (const [key, value] of params.entries()) {
    if (key !== 'hash' && key !== 'signature') {
      parts.push(`${key}=${value}`);
    }
  }
  return parts.sort().join('\n');
};
const verify = (initData, providedSignature) => {
  const data = sortAndConcat(initData);
  const key = createHash('sha256').update(BOT_SECRET).digest();
  const computed = createHmac('sha256', key).update(data).digest('hex');
  return computed === providedSignature;
};
export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: "Only POST requests allowed" });
    return;
  }
  const { initData, signature } = req.body;
  if (!initData || !signature) {
    res.status(400).json({ error: "initData and signature must be provided" });
    return;
  }
  if (verify(initData, signature)) {
    const params = new URLSearchParams(initData);
    const user = params.get('username') || 'Anonymous';
    res.status(200).json({ status: 'OK', username: user });
  } else {
    res.status(400).json({ error: "Signature verification failed" });
  }
}