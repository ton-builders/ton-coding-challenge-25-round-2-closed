import type { NextApiRequest, NextApiResponse } from 'next';
import { validateInitData } from '../../utils/validateInitData';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const rawMessage = req.body;

		try {
			const { valid, userName } = await validateInitData(rawMessage);

			if (valid) {
				res.status(200).json({
					welcomeMessage: `Welcome @${userName} for successful verification!!`,
				});
			} else {
				res.status(400).json({
					welcomeMessage:
						'You are not verified due to invalid initData signature!!',
				});
			}
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
