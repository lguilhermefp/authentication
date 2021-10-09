import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const signUpRoute = {
	path: '/api/signup',
	method: 'post',
	handler: async (req, res) => {
		const { email, password } = req.body;

		const db = getDbConnection('react-auth-db');
		const user = await db.collection('users').findOne({ email });

		if(user) {
			res.sendStatus(409);
		}

		await bcrypt.hash(password, bcrypt.genSaltSync(10), null, async (err, hash) => {
			const result = await db.collection('users').insertOne({
				email,
				password: hash,
				info: startingInfo,
				isVerified: false,
			});
			const { insertedId } = result;
			const startingInfo = {
				hairColor: '',
				favoriteFood: '',
			};
	
			jwt.sign({
				id: insertedId,
				email,
				info: startingInfo,
				isVerified: false,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '2d',
			},
			(err, token) => {
				if(err) {
					return res.status(500).send(err);
				}
				res.status(200).json({ token });
			});	
		});
	}
}
