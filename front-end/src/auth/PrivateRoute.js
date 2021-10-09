import { Rdirect, Route } from 'react-router-dom';

export const PrivateRoute = (props) => {
	const user = null;

	if(!user) return <Recirect to="/login" />

	return <Route {...props} />
}