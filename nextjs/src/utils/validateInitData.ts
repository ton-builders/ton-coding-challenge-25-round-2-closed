import { verify } from 'jsonwebtoken';

const BOT_TOKEN = process.env.BOT_TOKEN; // Ensure you set this in your environment variables

interface InitData {
    signature: string;
}

export const validateInitData = (initData: InitData) => {
    try {
        if (!BOT_TOKEN) {
            throw new Error('BOT_TOKEN is not defined in environment variables');
        }
        const decoded = verify(initData.signature, BOT_TOKEN);
        return {
            valid: true,
            userName: typeof decoded === 'object' && 'username' in decoded ? decoded.username : undefined, // Ensure decoded is an object and contains username
        };
    } catch (error) {
        return {
            valid: false,
            error: 'Invalid signature',
        };
    }
};