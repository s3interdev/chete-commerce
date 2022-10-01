import { useEffect, useReducer } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Layout from '../../components/layout';
import { getError } from '../../lib/error';

function reducer(state, action) {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, order: action.payload, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			state;
	}
}

const OrderPage = () => {
	/* order/:id */
	const { query } = useRouter();
	const orderId = query.id;

	const [{ loading, error, order }, dispatch] = useReducer(reducer, {
		loading: true,
		order: {},
		error: '',
	});

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });

				const { data } = await axios.get(`/api/orders/${orderId}`);

				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};

		if (!order._id || (order._id && order._id !== orderId)) {
			fetchOrder();
		}
	}, [order, orderId]);

	const {
		shippingAddress,
		paymentMethod,
		orderItems,
		itemsPrice,
		tax,
		shippingCost,
		totalCost,
		isPaid,
		paidOn,
		isDelivered,
		deliveredOn,
	} = order;

	return (
		<Layout title={`Order ${orderId}`}>
			<h1 className="mb-5 text-xl">{`Order ${orderId}`}</h1>

			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div className="alert-error">{error}</div>
			) : (
				/* order confirmation grid start */
				<div className="grid md:grid-cols-4 md:gap-5">
					{/* grid area left start */}
					<div className="overflow-x-auto md:col-span-3">
						{/* shipping address card start */}
						<div className="card p-5">
							<h2 className="mb-2 text-lg">Shipping Address</h2>
							<div>
								{shippingAddress.fullName}, {shippingAddress.address},{' '}
								{shippingAddress.city}, {shippingAddress.postalCode},{' '}
								{shippingAddress.country}
							</div>
							{isDelivered ? (
								<div className="alert-success">Delivered on {deliveredOn}</div>
							) : (
								<div className="alert-error">Not delivered</div>
							)}
						</div>
						{/* shipping address card end */}

						{/* payment method card start */}
						<div className="card p-5">
							<h2 className="mb-2 text-lg">Payment Method</h2>
							<div>{paymentMethod}</div>
							{isPaid ? (
								<div className="alert-success">Paid on {paidOn}</div>
							) : (
								<div className="alert-error">Not paid</div>
							)}
						</div>
						{/* payment method card end */}

						{/* order items card start */}
						<div className="card overflow-x-auto p-5">
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
									{orderItems.map((item) => (
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
								</li>{' '}
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
							</ul>
						</div>
						{/* call to action end */}
					</div>
					{/* grid area right end */}
				</div>
				/* order confirmation grid end */
			)}
		</Layout>
	);
};

OrderPage.auth = true;

export default OrderPage;