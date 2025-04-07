import { useEffect } from 'react';
export default function Home() {
  useEffect(() => {
    const requestFullScreen = async () => {
      if (document.documentElement.requestFullscreen) {
        try {
          await document.documentElement.requestFullscreen();
        } catch (error) {
          console.error('Error while entering fullscreen mode:', error);
        }
      }
    };
    requestFullScreen();
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fafafa' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Telegram: @kikipolisna</h1>
      <p style={{ fontSize: '1.5rem' }}>Wallet: UQA7zmea6PDnzbtOIcGVg3IE0qvN18segxm_g5h3kBtSWVRc</p>
    </div>
  );
}