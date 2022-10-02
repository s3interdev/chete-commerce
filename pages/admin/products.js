import { useEffect, useReducer } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Layout from '../../components/layout';
import { getError } from '../../lib/error';

function reducer(state, action) {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, products: action.payload, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			state;
	}
}

const AdminProductsPage = () => {
	const [{ loading, error, products }, dispatch] = useReducer(reducer, {
		loading: true,
		products: [],
		error: '',
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });

				const { data } = await axios.get(`/api/admin/products`);

				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};

		fetchData();
	}, []);

	return (
		<Layout title="Administrative Dashboard Products">
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
								<a className="text-lg">Orders</a>
							</Link>
						</li>
						<li>
							<Link href="/admin/products">
								<a className="text-lg font-semibold">Products</a>
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
					<h1 className="mb-5 text-xl">Products</h1>

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
										<th className="p-5 text-left">Name</th>
										<th className="p-5 text-left">Price</th>
										<th className="p-5 text-left">Category</th>
										<th className="p-5 text-left">Count</th>
										<th className="p-5 text-left">Rating</th>
										<th className="p-5 text-left">Actions</th>
									</tr>
								</thead>

								<tbody>
									{products.map((product) => (
										<tr key={product._id} className="border-b">
											<td className="p-5">{product._id.substring(20, 24)}</td>
											<td className="p-5">{product.name}</td>
											<td className="p-5">${product.price}</td>
											<td className="p-5">{product.category}</td>
											<td className="p-5">{product.numberInStock}</td>
											<td className="p-5">{product.rating}</td>
											<td className="p-5">
												<Link href={`/admin/product/${product._id}`}>
													<a>Edit</a>
												</Link>
												&nbsp;
												<span>|</span>
												&nbsp;
												<button>Delete</button>
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

AdminProductsPage.auth = { adminOnly: true };

export default AdminProductsPage;
