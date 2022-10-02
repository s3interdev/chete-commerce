import { useEffect, useReducer } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import Layout from '../../components/layout';
import { getError } from '../../lib/error';

function reducer(state, action) {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, orders: action.payload, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			state;
	}
}

const AdminOrdersPage = () => {
	const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
		loading: true,
		orders: [],
		error: '',
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });

				const { data } = await axios.get(`/api/admin/orders`);

				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};

		fetchData();
	}, []);

	return (
		<Layout title="Administrative Dashboard">
			<div className="grid md:grid-cols-4 md:gap-5">
				<div>
					<ul className="space-y-2">
						<li>
							<Link href="/admin/dashboard">
								<a className="mb-5 text-xl">Administrative Dashboard</a>
							</Link>
						</li>
						<li>
							<Link href="/admin/orders">
								<a className="text-lg font-semibold">Orders</a>
							</Link>
						</li>
						<li>
							<Link href="/admin/products">
								<a className="text-lg">Products</a>
							</Link>
						</li>
						<li>
							<Link href="/admin/users">
								<a className="text-lg">Users</a>
							</Link>
						</li>
					</ul>
				</div>

				<div className="overflow-x-auto md:col-span-3">
					<h1 className="mb-5 text-xl">Orders</h1>

					{loading ? (
						<div>Loading...</div>
					) : error ? (
						<div className="alert-error">{error}</div>
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full">
								<thead className="border-b">
									<tr>
										<th className="px-5 text-left">ID</th>
										<th className="p-5 text-left">User</th>
										<th className="p-5 text-left">Date</th>
										<th className="p-5 text-left">Total</th>
										<th className="p-5 text-left">Paid</th>
										<th className="p-5 text-left">Delivered</th>
										<th className="p-5 text-left">Action</th>
									</tr>
								</thead>

								<tbody>
									{orders.map((order) => (
										<tr key={order._id} className="border-b">
											<td className="p-5">{order._id.substring(20, 24)}</td>
											<td className="p-5">
												{order.user ? order.user.name : 'Test User'}
											</td>
											<td className="p-5">
												{format(parseISO(order.createdAt), 'MMMM do, yyyy')}
											</td>
											<td className="p-5">${order.totalCost}</td>
											<td className="p-5">
												{order.isPaid
													? `${format(parseISO(order.paidOn), 'MMMM do, yyyy')}`
													: 'not paid'}
											</td>
											<td className="p-5">
												{order.isDelivered
													? `${format(parseISO(order.deliveredOn), 'MMMM do, yyyy')}`
													: 'not delivered'}
											</td>
											<td className="p-5">
												<Link href={`/order/${order._id}`} passHref>
													<a>Details</a>
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

AdminOrdersPage.auth = { adminOnly: true };

export default AdminOrdersPage;
