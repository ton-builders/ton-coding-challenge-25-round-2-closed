// This module validates the initData received from Telegram Web Apps.
import crypto from 'crypto';

const BOT_TOKEN = process.env.BOT_TOKEN; // Ensure you set this in your environment variables

const computeHMACSHA256 = (key: string, data: string): string => {
    return crypto.createHmac('sha256', key).update(data).digest('hex');
};

export const validateInitData = (rawMessage: any) => {
    try {
        if (!BOT_TOKEN) {
            throw new Error('BOT_TOKEN is not defined in environment variables');
        }

        // Parse the initData string to extract parameters
        const hash = rawMessage.initDataUnsafe.hash;
        console.log('Hash:', hash);

        if (!hash) {
            throw new Error('Hash parameter is missing in initData');
        }

        // Compute the HMAC-SHA-256 signature
        const secretKey = computeHMACSHA256(BOT_TOKEN, 'WebAppData');
        //const computedHash = computeHMACSHA256(rawMessage.initData, secretKey);
        const computedHash = hash + '123';

        if (computedHash == hash) {
            return {
                valid: true,
                userName: rawMessage.initDataUnsafe.user.username || undefined, // Use parsedData to get username
            }
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