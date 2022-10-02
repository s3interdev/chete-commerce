import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getError } from '../lib/error';
import Layout from '../components/layout';

const ProfilePage = () => {
	const { data: session } = useSession();

	const {
		handleSubmit,
		register,
		getValues,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setValue('name', session.user.name);
		setValue('email', session.user.email);
	}, [session.user, setValue]);

	const submitHandler = async ({ name, email, password }) => {
		try {
			await axios.put('/api/auth/update', {
				name,
				email,
				password,
			});

			const result = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});

			toast.success('Profile updated successfully');

			if (result.error) {
				toast.error(result.error);
			}
		} catch (err) {
			toast.error(getError(err));
		}
	};

	return (
		<Layout title="Profile">
			<form className="mx-auto max-w-screen-sm" onSubmit={handleSubmit(submitHandler)}>
				<h1 className="mb-5 text-xl">Update Profile</h1>

				<div className="mb-4">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						className="w-full rounded"
						id="name"
						autoFocus
						{...register('name', {
							required: 'Please enter your name',
						})}
					/>
					{errors.name && <div className="mt-1 text-red-500">{errors.name.message}</div>}
				</div>

				<div className="mb-4">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						className="w-full rounded"
						id="email"
						{...register('email', {
							required: 'Please enter your email address',
							pattern: {
								value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
								message: 'Please enter a valid email address',
							},
						})}
					/>
					{errors.email && (
						<div className="mt-1 text-red-500">{errors.email.message}</div>
					)}
				</div>

				<div className="mb-4">
					<label htmlFor="password">Password</label>
					<input
						className="w-full rounded"
						type="password"
						id="password"
						{...register('password', {
							minLength: {
								value: 6,
								message: 'Password has to be more than 5 characters',
							},
						})}
					/>
					{errors.password && (
						<div className="mt-1 text-red-500">{errors.password.message}</div>
					)}
				</div>

				<div className="mb-4">
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						className="w-full rounded"
						type="password"
						id="confirmPassword"
						{...register('confirmPassword', {
							validate: (value) => value === getValues('password'),
							minLength: {
								value: 6,
								message: 'Password has to be more than 5 characters',
							},
						})}
					/>
					{errors.confirmPassword && (
						<div className="mt-1 text-red-500">{errors.confirmPassword.message}</div>
					)}

					{errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
						<div className="mt-1 text-red-500">Passwords do not match</div>
					)}
				</div>
				<div className="mb-4">
					<button className="primary-button uppercase">Update Profile</button>
				</div>
			</form>
		</Layout>
	);
};

ProfilePage.auth = true;

export default ProfilePage;
