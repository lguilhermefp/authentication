import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const LogInPage = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const history = useHistory();

	const onLogInClicked = async() => {
		alert('log in not implemented yet')
	}

	return (
		<div className="content-container">
			<h1>Log in</h1>
			{errorMessage && <div className="fail">{errorMessage}</div>}
			<input
				value={emailValue}
				onchange={e => setEmailValue(e.target.value)}
			 	placeholder="someone@gmail.com" />
			<input
				type="password"
				value={passwordValue}
				onchange={e => setPasswordValue(e.target.value)}
				placeholder="password" />
			<button
				disabled={!emailValue || !passwordValue}
				onclick={onLogInClicked}>Log In </button>
			<button onClick={() => history.push('/forgot-password')}>Forgot your password?</button>
			<button onClick={() => history.push('/signup')}>Don't have an account? Sign Up</button>
		</div>
	)
}