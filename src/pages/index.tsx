import React, { useEffect } from 'react';
import Head from 'next/head';

const Home: React.FC = () => {
	useEffect(() => {
		// Ensure the Telegram Web App script is loaded and accessible
		if (typeof window !== 'undefined' && window.Telegram) {
			const tg = window.Telegram.WebApp;

			// Detect if the client is on a mobile device
			const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

			if (isMobile) {
				// Request fullscreen mode for mobile devices
				tg.requestFullscreen();
			} else {
				// Expand for non-mobile devices
				tg.expand();
			}

			// Function to log debug info
			const logDebugInfo = (message: string | object) => {
				const debugElement = document.getElementById('debug-info');
				if (debugElement) {
					if (typeof message === 'object') {
						// Format JSON object for display
						debugElement.innerHTML += `${JSON.stringify(
							message,
							null,
							2
						)}`;
					} else {
						debugElement.innerHTML += `${message}\n`;
					}
				}
			};

			const postData = async (tg: any) => {
				const url = '/api/validate';

				try {
					const response = await fetch(url, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							initData: tg.initData,
							initDataUnsafe: tg.initDataUnsafe,
						}),
					});

					if (response.ok) {
						const data = await response.json();
						alert(data);
					} else {
						throw new Error('Network response with status ' + response.status);
					}
				} catch (error) {
					logDebugInfo(`Error: ${error}`);
				}
			};

			// Call the function to make the POST request
			postData(tg);
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

				{/* Debug Info Section */}
				<pre
					id="debug-info"
					style={{
						marginTop: '20px',
						padding: '10px',
						backgroundColor: '#e0e0e0',
						width: '80%',
						overflow: 'auto',
						maxHeight: '200px',
						border: '1px solid #ccc',
						display: 'none',
					}}
				>
					Debug Info:
				</pre>
			</div>
		</>
	);
};

export default Home;
