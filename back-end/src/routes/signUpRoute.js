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

		const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(10), null, async (err, hash) => {
			req.body.password = hash;
			await console.log(hash);
			const result = await db.collection('users').insertOne({
				email,
				password: hash,
				info: startingInfo,
				isVerified: false,
			});
			const startingInfo = {
				hairColor: '',
				favoriteFood: '',
				bio: '',
			};
	
			const { insertedId } = result;
	
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
