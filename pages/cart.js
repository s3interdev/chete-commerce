import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from '../lib/store';
import Layout from '../components/layout';
import { XCircleIcon } from '@heroicons/react/outline';

const CartPage = () => {
	const { state, dispatch } = useContext(Store);

	const {
		cart: { cartItems },
	} = state;

	/** remove item from cart */
	const removeItemHandler = (item) => {
		dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
	};

	/** update item in cart */
	const updateCartHandler = (item, qty) => {
		const quantity = Number(qty);
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
	};

	const router = useRouter();

	return (
		<Layout title="Shopping Cart">
			<h1 className="mb-5 text-xl">Shopping Cart</h1>

			{cartItems.length === 0 ? (
				<div>
					Your cart is empty...{' '}
					<Link href="/">
						<a className="primary-button uppercase">Please Buy Something</a>
					</Link>
				</div>
			) : (
				/* shopping cart grid start */
				<div className="grid md:grid-cols-4 md:gap-5">
					{/* shopping cart display table start */}
					<div className="overflow-x-auto md:col-span-3">
						<table className="min-w-full">
							<thead className="border-b">
								<tr>
									<th className="p-5 text-left">Item</th>
									<th className="p-5 text-right">Quantity</th>
									<th className="p-5 text-right">Price</th>
									<th className="p-5">Action</th>
								</tr>
							</thead>

							<tbody>
								{cartItems.map((item) => (
									<tr key={item.slug} className="border-b">
										<td>
											<Link href={`/product/${item.slug}`}>
												<a className="flex items-center">
													<Image
														src={item.image}
														alt={item.name}
														width={30}
														height={50}
													></Image>
													&nbsp; &nbsp;
													{item.name}
												</a>
											</Link>
										</td>
										<td className="p-5 text-right">
											<select
												value={item.quantity}
												onChange={(e) => updateCartHandler(item, e.target.value)}
												className="w-16"
											>
												{[...Array(item.numberInStock).keys()].map((i) => (
													<option key={i + 1} value={i + 1}>
														{i + 1}
													</option>
												))}
											</select>
										</td>
										<td className="p-5 text-right">${item.price}</td>
										<td className="p-5 text-center">
											<button onClick={() => removeItemHandler(item)}>
												<XCircleIcon className="h-5 w-5"></XCircleIcon>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{/* shopping cart display table end */}

					{/* call to action start */}
					<div className="card p-5">
						<ul>
							<li>
								<div className="pb-3 text-xl">
									Subtotal (
									{cartItems.reduce(
										(previousValue, currentValue) =>
											previousValue + currentValue.quantity,
										0
									)}
									) : $
									{cartItems.reduce(
										(previousValue, currentValue) =>
											previousValue + currentValue.quantity * currentValue.price,
										0
									)}
								</div>
							</li>
							<li>
								<button
									onClick={() => router.push('/shipping')}
									className="primary-button w-full uppercase"
								>
									Check Out
								</button>
							</li>
						</ul>
					</div>
					{/* call to action end */}
				</div>
				/* shopping cart grid end */
			)}
		</Layout>
	);
};

export default CartPage;
