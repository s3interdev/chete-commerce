import { useEffect, useReducer } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../../components/layout';
import { getError } from '../../lib/error';

function reducer(state, action) {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, users: action.payload, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		case 'DELETE_REQUEST':
			return { ...state, loadingDelete: true };
		case 'DELETE_SUCCESS':
			return { ...state, loadingDelete: false, successDelete: true };
		case 'DELETE_FAIL':
			return { ...state, loadingDelete: false };
		case 'DELETE_RESET':
			return { ...state, loadingDelete: false, successDelete: false };
		default:
			return state;
	}
}

const AdminUsersPage = () => {
	const [{ loading, error, users, successDelete, loadingDelete }, dispatch] = useReducer(
		reducer,
		{
			loading: true,
			users: [],
			error: '',
		}
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });

				const { data } = await axios.get(`/api/admin/users`);

				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};

		if (successDelete) {
			dispatch({ type: 'DELETE_RESET' });
		} else {
			fetchData();
		}
	}, [successDelete]);

	const deleteHandler = async (userId) => {
		if (!window.confirm('Are you sure?')) {
			return;
		}

		try {
			dispatch({ type: 'DELETE_REQUEST' });

			await axios.delete(`/api/admin/users/${userId}`);

			dispatch({ type: 'DELETE_SUCCESS' });

			toast.success('User deleted successfully');
		} catch (err) {
			dispatch({ type: 'DELETE_FAIL' });
			toast.error(getError(err));
		}
	};

	return (
		<Layout title="Administrative Dashboard Users">
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
								<a className="text-lg">Products</a>
							</Link>
						</li>
						<li>
							<Link href="/admin/users">
								<a className="text-lg font-semibold">Users</a>
							</Link>
						</li>
					</ul>
				</div>

				<div className="overflow-x-auto md:col-span-3">
					<h1 className="mb-5 text-xl">Users</h1>

					{loadingDelete && <div>Deleting...</div>}

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
										<th className="p-5 text-left">Email</th>
										<th className="p-5 text-left">Admin</th>
										<th className="p-5 text-left">Actions</th>
									</tr>
								</thead>

								<tbody>
									{users.map((user) => (
										<tr key={user._id} className="border-b">
											<td className="p-5">{user._id.substring(20, 24)}</td>
											<td className="p-5">{user.name}</td>
											<td className="p-5">{user.email}</td>
											<td className="p-5">{user.isAdmin ? 'YES' : 'NO'}</td>
											<td className="p-5">
												<Link href={`/admin/user/${user._id}`} passHref>
													<a type="button" className="default-button m-1 uppercase">
														Edit
													</a>
												</Link>
												<button
													type="button"
													className="default-button m-1 uppercase"
													onClick={() => deleteHandler(user._id)}
												>
													Delete
												</button>
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

AdminUsersPage.auth = { adminOnly: true };

export default AdminUsersPage;
