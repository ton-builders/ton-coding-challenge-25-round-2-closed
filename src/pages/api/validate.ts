import type { NextApiRequest, NextApiResponse } from 'next';
import { validateInitData } from '../../utils/validateInitData';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const rawMessage = req.body;

        try {
            // Validate initData received from Telegram Web Apps
            const { valid, userName } = await validateInitData(rawMessage);
            const welcomeMessage = valid
                ? `Welcome @${userName} for successful verification!!`
                : 'You are not verified due to invalid initData signature!!';
            res.status(200).json({ welcomeMessage });
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
