// This module validates the initData received from Telegram Web Apps.
import crypto from 'crypto';

const BOT_TOKEN = process.env.BOT_TOKEN;

export const validateInitData = (rawMessage: any) => {
	try {
		// Check if BOT_TOKEN is defined
		if (!BOT_TOKEN) {
			throw new Error('BOT_TOKEN is not defined in environment variables');
		}

		// Get the hash from initData
		const initData = new URLSearchParams(rawMessage.initData);
		const hash = initData.get('hash');
		if (!hash) {
			throw new Error('Hash parameter is missing in initData');
		}

		// Remove the hash parameter and sort the remaining parameters
		const dataToCheck: string[] = [];
		initData.sort();
		initData.forEach(
			(val, key) => key !== 'hash' && dataToCheck.push(`${key}=${val}`)
		);

		// Compute the secret key using the bot token
		const secret = crypto
			.createHmac('sha256', 'WebAppData2')
			.update(BOT_TOKEN)
			.digest();

		// Compute the HMAC-SHA-256 hash
		const _hash = crypto
			.createHmac('sha256', secret)
			.update(dataToCheck.join('\n'))
			.digest('hex');

		// Compare the computed hash with the received hash
		if (hash == _hash) {
			return {
				valid: true,
				userName: rawMessage.initDataUnsafe.user.username || undefined,
			};
		} else {
			throw new Error('Invalid hash');
		}
	} catch (error) {
		console.log(error);
		return {
			valid: false,
			userName: undefined,
		};
	}
};
