import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const  logInRoute = {
	path: '/api/login',
	method: 'post',
	handler: async (req, res) => {
		const { email, password} = req.body;

		const db = getDbConnection('react-auth-db');
		const user = await db.collection('users').findOne({ email });

		if(!user) return res.sendStatus(401);

		const { _id: id, isVerified, password: passwordHash, info } = user;

		const isCorrect = await bcrypt.compareSync(password, passwordHash, () => console.log(passwordHash, password));
		await console.log(isCorrect);

		if(isCorrect) {
			jwt.sign({ id, isVerified, email, info }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
				if (err) {
					res.status(500).json(err);
				}
				res.status(200).json({ token });
			});
			
		} else {
			res.sendStatus(401);
		}
	}
}