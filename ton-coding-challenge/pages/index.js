import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Пытаемся перейти в полноэкранный режим при загрузке компонента
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Ошибка при переходе в полноэкранный режим:", err);
      });
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f0f0f0'
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        Telegram Username: @dudhhsbshs
      </h1>
      <p style={{ fontSize: '1.5rem', textAlign: 'center' }}>
        Wallet Address: UQBicUiXrZqxzPExSjw4UP4a4ltFscS-cX50SeLj4_eZ-4uN
      </p>
    </div>
  );
}
