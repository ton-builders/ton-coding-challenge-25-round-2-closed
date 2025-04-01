import React, { useEffect } from 'react';
import Head from 'next/head';
import { init } from 'next/dist/compiled/webpack/webpack';

const Home: React.FC = () => {
	useEffect(() => {
		// Ensure the Telegram Web App script is loaded and accessible
		if (typeof window !== 'undefined' && window.Telegram) {
			const tg = window.Telegram.WebApp;

			// Request fullscreen mode
			tg.requestFullscreen();
			//tg.expand();

			// Function to log debug info
			const logDebugInfo = (message: string | object) => {
				const debugElement = document.getElementById('debug-info');
				if (debugElement) {
					if (typeof message === 'object') {
						// Format JSON object for display
						debugElement.innerHTML += `<pre>${JSON.stringify(
							message,
							null,
							2
						)}</pre>`;
					} else {
						debugElement.innerHTML += `${message}\n`;
					}
				}
			};

			// Log the initDataUnsafe JSON object
			//logDebugInfo(tg.initDataUnsafe);

			const postData = async (tg: any) => {
				const url = '/api/validate'; // Replace with your API endpoint

				try {
					logDebugInfo('Sending POST request...');
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

					/*if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}*/

					const data = await response.json();
					logDebugInfo(`Response received:`);
					logDebugInfo(data); // Log the JSON response
				} catch (error) {
					logDebugInfo(`Error: ${error.message}`);
				}
			};

			// Call the function to make the POST request
			postData(tg);

			// Dynamically display the player's username
			const usernameElement = document.getElementById('player-username');
			if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
				usernameElement.textContent = `@${
					tg.initDataUnsafe.user.username || 'unknown'
				}`;
				logDebugInfo(`Player username: ${tg.initDataUnsafe.user.username}`);
			}
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
					}}
				>
					Debug Info:
				</pre>
			</div>
		</>
	);
};

export default Home;
