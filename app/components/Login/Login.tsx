'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';
import * as messages from './Login.messages';

const Login = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const router = useRouter();

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push('/Items');
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleLogin}>
				<h1 className={styles.title}>{messages.headerText}</h1>
				<div className={styles['input_div']}>
					<label className={styles['email_label']}>{messages.emailLabel}</label>
					<input
						className={styles['input']}
						type='email'
						placeholder={messages.emailPlaceholder as string}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className={styles['input_div']}>
					<input
						className={styles['input']}
						type='password'
						placeholder={messages.passwordPlaceholder as string}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button type='submit' className={styles['submit_button']}>
					{messages.submitButtonText}
				</button>
			</form>
		</div>
	);
};

export default Login;
