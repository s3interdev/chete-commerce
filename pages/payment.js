import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Store } from '../lib/store';
import Layout from '../components/layout';
import CheckoutWizard from '../components/checkout-wizard';

const PaymentPage = () => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const { shippingAddress, paymentMethod } = cart;

	const router = useRouter();

	useEffect(() => {
		if (!shippingAddress.address) {
			return router.push('/shipping');
		}

		setSelectedPaymentMethod(paymentMethod || '');
	}, [paymentMethod, router, shippingAddress.address]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (!selectedPaymentMethod) {
			return toast.error('A payment method is required');
		}

		dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });

		Cookies.set(
			'cart',
			JSON.stringify({
				...cart,
				paymentMethod: selectedPaymentMethod,
			})
		);

		/** take user to the place order page */
		router.push('/placeorder');
	};

	return (
		<Layout title="Payment Method">
			<CheckoutWizard activeStep={2} />

			{/* payment form start */}
			<form className="mx-auto max-w-screen-sm" onSubmit={submitHandler}>
				<h1 className="mb-5 text-xl">Payment Method</h1>

				{['PayPal', 'Cash on Delivery'].map((payment) => (
					<div key={payment} className="mb-4">
						<input
							name="paymentMethod"
							className="p-2 outline-none focus:ring-0"
							id={payment}
							type="radio"
							checked={selectedPaymentMethod === payment}
							onChange={() => setSelectedPaymentMethod(payment)}
						/>

						<label className="p-2" htmlFor={payment}>
							{payment}
						</label>
					</div>
				))}

				<div className="mb-4 flex justify-between">
					<button
						onClick={() => router.push('/shipping')}
						type="button"
						className="default-button uppercase"
					>
						Back
					</button>

					<button className="primary-button uppercase">Next</button>
				</div>
			</form>
			{/* payment form end */}
		</Layout>
	);
};

export default PaymentPage;
