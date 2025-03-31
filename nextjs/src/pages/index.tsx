import React, { useEffect } from 'react';
import Head from 'next/head';

const Home: React.FC = () => {
	useEffect(() => {
		// Ensure the Telegram Web App script is loaded and accessible
		if (typeof window !== 'undefined' && window.Telegram) {
			const tg = window.Telegram.WebApp;
			tg.expand(); // Example: Expand the Mini App to fullscreen
		}
	}, []);

	return (
		<>
			<Head>
				<script src="https://telegram.org/js/telegram-web-app.js"></script>
			</Head>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					backgroundColor: '#f0f0f0',
				}}
			>
				<h1>Welcome to the Mini App</h1>
				<p>
					Developer: <strong id="developer-username">@laihowo</strong>
				</p>
				<p>
					Player: <strong id="player-username"></strong>
				</p>
			</div>
		</>
	);
};

export default Home;
