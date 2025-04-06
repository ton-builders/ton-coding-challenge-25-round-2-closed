import React, { useEffect } from 'react';
import { createHash, createHmac } from 'crypto';

// Client Component
export function Variant5Page() {
  useEffect(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => console.error('Fullscreen request failed:', err));
    }
  }, []);
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', backgroundColor: '#eaeaea' }}>
      <h1 style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>Telegram: @JackReachy</h1>
      <p style={{ fontSize: '1.3rem' }}>Wallet: UQBqDUtXzQ42H41hDPj9nN9vs7q4zFzhX-rArtIVZ8DOoFai</p>
    </div>
  );
}

// API Handler
export function variant5Handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { initData, signature } = req.body;
  if (!initData || !signature) {
    res.status(400).json({ error: 'Missing initData or signature' });
    return;
  }
  const params = new URLSearchParams(initData);
  const pairs = [];
  for (const [key, value] of params.entries()) {
    if (key !== 'hash' && key !== 'signature') {
      pairs.push({ key, value });
    }
  }
  pairs.sort((a, b) => a.key.localeCompare(b.key));
  const dataStr = pairs.map(p => `${p.key}=${p.value}`).join('\n');
  const BOT_TOKEN = '7945408908:AAGp_pxkYNSC2xdpDVXIUfl_cQtpcDUiimY';
  const secret = createHash('sha256').update(BOT_TOKEN).digest();
  const computedHash = createHmac('sha256', secret).update(dataStr).digest('hex');
  if (computedHash === signature) {
    const username = params.get('username') || 'Unknown';
    res.status(200).json({ result: 'Signature valid', username });
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
}