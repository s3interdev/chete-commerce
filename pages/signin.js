import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout';
import { toast } from 'react-toastify';
import { getError } from '../lib/error';

const SigninPage = () => {
	const { data: session } = useSession();

	const router = useRouter();
	const { redirect } = router.query;

	useEffect(() => {
		if (session?.user) {
			router.push(redirect || '/');
		}
	}, [router, session, redirect]);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const submitHandler = async ({ email, password }) => {
		try {
			const result = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});

			if (result.error) {
				toast.error(result.error);
			}
		} catch (err) {
			toast.error(getError(err));
		}
	};

	return (
		<Layout title="Sign in">
			{/* sign in form start */}
			<form className="mx-auto max-w-screen-sm" onSubmit={handleSubmit(submitHandler)}>
				<h1 className="mb-5 text-xl">Sign in</h1>

				<div className="mb-4">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						{...register('email', {
							required: 'Please enter your email address',
							pattern: {
								value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
								message: 'Please enter valid email address',
							},
						})}
						id="email"
						className="w-full rounded"
						autoFocus
					></input>
					{errors.email && (
						<div className="mt-1 text-red-500">{errors.email.message}</div>
					)}
				</div>

				<div className="mb-4">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						{...register('password', {
							required: 'Please enter your password',
							minLength: {
								value: 6,
								message: 'Password should be longer than 5 characters',
							},
						})}
						id="password"
						className="w-full rounded"
					></input>
					{errors.password && (
						<div className="mt-1 text-red-500">{errors.password.message}</div>
					)}
				</div>

				<div className="mb-4 ">
					<button className="primary-button uppercase">Sign in</button>
				</div>

				<div className="mb-4 ">
					Don&apos;t have an account? &nbsp;
					<Link href="register">
						<a className="hover:underline">Register</a>
					</Link>
				</div>
			</form>
			{/* sign in form end */}
		</Layout>
	);
};

export default SigninPage;
