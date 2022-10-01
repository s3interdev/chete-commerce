import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/checkout-wizard';
import Layout from '../components/layout';
import { getError } from '../lib/error';
import { Store } from '../lib/store';

const PlaceorderPage = () => {
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const { cartItems, shippingAddress, paymentMethod } = cart;

	const roundTwoDP = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

	const itemsPrice = roundTwoDP(
		cartItems.reduce(
			(previousValue, currentValue) =>
				previousValue + currentValue.quantity * currentValue.price,
			0
		)
	);

	const shippingCost = itemsPrice > 200 ? 0 : 15;
	const tax = roundTwoDP(itemsPrice * 0.16);
	const totalCost = roundTwoDP(itemsPrice + shippingCost + tax);

	const router = useRouter();

	useEffect(() => {
		if (!paymentMethod) {
			router.push('/payment');
		}
	}, [paymentMethod, router]);

	const [loading, setLoading] = useState(false);

	const placeOrderHandler = async () => {
		try {
			setLoading(true);

			const { data } = await axios.post('/api/orders', {
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingCost,
				tax,
				totalCost,
			});

			setLoading(false);

			dispatch({ type: 'CART_CLEAR_ITEMS' });

			Cookies.set(
				'cart',
				JSON.stringify({
					...cart,
					cartItems: [],
				})
			);

			/** take user to the order confirmation page */
			router.push(`/order/${data._id}`);
		} catch (err) {
			setLoading(false);
			toast.error(getError(err));
		}
	};

	return (
		<Layout title="Place Order">
			<CheckoutWizard activeStep={3} />
			<h1 className="mb-5 text-xl">Place Order</h1>

			{cartItems.length === 0 ? (
				<div>
					Your cart is empty,{' '}
					<Link href="/">
						<a className="underline">please buy something.</a>
					</Link>
				</div>
			) : (
				/* order placement grid start */
				<div className="grid md:grid-cols-4 md:gap-5">
					{/* grid area left start */}
					<div className="overflow-x-auto md:col-span-3">
						{/* shipping address card start */}
						<div className="card space-y-2 p-5">
							<h2 className="mb-2 text-lg">Shipping Address</h2>
							<div>
								{shippingAddress.fullName}, {shippingAddress.address},{' '}
								{shippingAddress.city}, {shippingAddress.postalCode},{' '}
								{shippingAddress.country}
							</div>
							<div>
								<Link href="/shipping">
									<a className="primary-button uppercase">Edit</a>
								</Link>
							</div>
						</div>
						{/* shipping address card end */}

						{/* payment method card start */}
						<div className="card space-y-2 p-5">
							<h2 className="mb-2 text-lg">Payment Method</h2>
							<div>{paymentMethod}</div>
							<div>
								<Link href="/payment">
									<a className="primary-button mt-2 uppercase">Edit</a>
								</Link>
							</div>
						</div>
						{/* payment method card end */}

						{/* order items card start */}
						<div className="card space-y-4 overflow-x-auto p-5">
							<h2 className="mb-2 text-lg">Order Items</h2>
							<table className="min-w-full">
								<thead className="border-b">
									<tr>
										<th className="px-5 text-left">Item</th>
										<th className="p-5 text-right">Quantity</th>
										<th className="p-5 text-right">Price</th>
										<th className="p-5 text-right">Subtotal</th>
									</tr>
								</thead>

								<tbody>
									{cartItems.map((item) => (
										<tr key={item._id} className="border-b">
											<td>
												<Link href={`/product/${item.slug}`}>
													<a className="flex items-center">
														<Image
															src={item.image}
															alt={item.name}
															width={30}
															height={50}
														></Image>
														&nbsp;
														{item.name}
													</a>
												</Link>
											</td>
											<td className="p-5 text-right">{item.quantity}</td>
											<td className="p-5 text-right">${item.price}</td>
											<td className="p-5 text-right">${item.quantity * item.price}</td>
										</tr>
									))}
								</tbody>
							</table>
							<div>
								<Link href="/cart">
									<a className="primary-button uppercase">Edit</a>
								</Link>
							</div>
						</div>
						{/* order items card end */}
					</div>
					{/* grid area left end */}

					{/* grid area right start */}
					<div>
						{/* call to action start */}
						<div className="card p-5">
							<h2 className="mb-2 text-lg">Order Summary</h2>
							<ul>
								<li>
									<div className="mb-2 flex justify-between">
										<div>Items</div>
										<div>${itemsPrice}</div>
									</div>
								</li>
								<li>
									<div className="mb-2 flex justify-between">
										<div>Tax</div>
										<div>${tax}</div>
									</div>
								</li>
								<li>
									<div className="mb-2 flex justify-between">
										<div>Shipping</div>
										<div>${shippingCost}</div>
									</div>
								</li>
								<li>
									<div className="mb-2 flex justify-between">
										<div>Total</div>
										<div>${totalCost}</div>
									</div>
								</li>
								<li>
									<button
										disabled={loading}
										onClick={placeOrderHandler}
										className="primary-button w-full uppercase"
									>
										{loading ? 'Loading...' : 'Place Order'}
									</button>
								</li>
							</ul>
						</div>
						{/* call to action end */}
					</div>
					{/* grid area right end */}
				</div>
				/* order placement grid end */
			)}
		</Layout>
	);
};

export default PlaceorderPage;
