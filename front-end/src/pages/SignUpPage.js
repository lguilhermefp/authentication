import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const SignUpPage = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

	const history = useHistory();

	const onSignUpClicked = async() => {
		alert('log in not implemented yet')
	}

	return (
		<div className="content-container">
			<h1>Sign Up</h1>
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
			<input
				type="password"
				value={confirmPasswordValue}
				onchange={e => setConfirmPasswordValue(e.target.value)}
				placeholder="confirm password" />
			<hr />
			<button
				disabled={
					!emailValue || !passwordValue ||
					passwordValue  !== confirmPasswordValue
				}
				onclick={onSignUpClicked}>sign Up</button>
			<button onClick={() => history.push('/login')}>Already have an account? Log In</button>
		</div>
	)
}