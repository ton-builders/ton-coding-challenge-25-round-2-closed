import React, { useEffect } from 'react';
export default function App() {
  useEffect(() => {
    const activateFullscreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => console.error('Fullscreen error:', err));
      }
    };
    activateFullscreen();
  }, []);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#eaeaea' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Telegram: @Heme3121</h1>
        <p style={{ fontSize: '1.6rem' }}>Wallet: UQBjeBwMPmDKx9s6Fdd2i99u7FYYHnbKa0MM8K3LEL2g1Yi7</p>
      </div>
    </div>
  );
}