import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { Store } from '../lib/store';
import Layout from '../components/layout';
import CheckoutWizard from '../components/checkout-wizard';

const ShippingPage = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm();

	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const { shippingAddress } = cart;
	const router = useRouter();

	/** fill the form based on the data in the shipping address of the state */
	useEffect(() => {
		setValue('fullName', shippingAddress.fullName);
		setValue('address', shippingAddress.address);
		setValue('city', shippingAddress.city);
		setValue('postalCode', shippingAddress.postalCode);
		setValue('country', shippingAddress.country);
	}, [setValue, shippingAddress]);

	const submitHandler = ({ fullName, address, city, postalCode, country }) => {
		dispatch({
			type: 'SAVE_SHIPPING_ADDRESS',
			payload: { fullName, address, city, postalCode, country },
		});
		Cookies.set(
			'cart',
			JSON.stringify({
				...cart,
				shippingAddress: {
					fullName,
					address,
					city,
					postalCode,
					country,
				},
			})
		);

		/** take user to payment page */
		router.push('/payment');
	};

	return (
		<Layout title="Shipping Address">
			<CheckoutWizard activeStep={1} />

			{/*shipping form start */}
			<form className="mx-auto max-w-screen-sm" onSubmit={handleSubmit(submitHandler)}>
				<h1 className="mb-5 text-xl">Shipping Address</h1>

				<div className="mb-4">
					<label htmlFor="fullName">Full Name</label>
					<input
						className="w-full rounded"
						id="fullName"
						autoFocus
						{...register('fullName', {
							required: 'Please enter your full name',
						})}
					/>
					{errors.fullName && (
						<div className="mt-1 text-red-500">{errors.fullName.message}</div>
					)}
				</div>

				<div className="mb-4">
					<label htmlFor="address">Address</label>
					<input
						className="w-full rounded"
						id="address"
						{...register('address', {
							required: 'Please enter your address',
						})}
					/>
					{errors.address && (
						<div className="mt-1 text-red-500">{errors.address.message}</div>
					)}
				</div>

				<div className="mb-4">
					<label htmlFor="city">City</label>
					<input
						className="w-full rounded"
						id="city"
						{...register('city', {
							required: 'Please enter your city',
						})}
					/>
					{errors.city && <div className="mt-1 text-red-500">{errors.city.message}</div>}
				</div>

				<div className="mb-4">
					<label htmlFor="postalCode">Postal Code</label>
					<input
						className="w-full rounded"
						id="postalCode"
						{...register('postalCode', {
							required: 'Please enter your postal code',
						})}
					/>
					{errors.postalCode && (
						<div className="mt-1 text-red-500">{errors.postalCode.message}</div>
					)}
				</div>

				<div className="mb-4">
					<label htmlFor="country">Country</label>
					<input
						className="w-full rounded"
						id="country"
						{...register('country', {
							required: 'Please enter your country',
						})}
					/>
					{errors.country && (
						<div className="mt-1 text-red-500">{errors.country.message}</div>
					)}
				</div>

				<div className="mb-4 flex justify-between">
					<button className="primary-button uppercase">Next</button>
				</div>
			</form>
			{/*shipping form end */}
		</Layout>
	);
};

ShippingPage.auth = true;

export default ShippingPage;
