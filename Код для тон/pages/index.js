import React, { useEffect } from 'react';
const LandingPage = () => {
  useEffect(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Fullscreen request failed:", err);
      });
    }
  }, []);
  return (
    <main style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: '#f0f0f0' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Telegram: @Songus112</h2>
      <div style={{ fontSize: '1.4rem' }}>Wallet: UQA7fCpwHeiNf-QMP8DybusfVJF0ZGwsL9e_8ifWlAP7AQvs</div>
    </main>
  );
};
export default LandingPage;