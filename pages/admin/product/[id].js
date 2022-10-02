import { useEffect, useReducer } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/layout';
import { getError } from '../../../lib/error';

function reducer(state, action) {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
}

const AdminProductEditPage = () => {
	const { query } = useRouter();
	const productId = query.id;
	const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
		loading: true,
		error: '',
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });

				const { data } = await axios.get(`/api/admin/products/${productId}`);

				dispatch({ type: 'FETCH_SUCCESS' });

				setValue('name', data.name);
				setValue('slug', data.slug);
				setValue('price', data.price);
				setValue('image', data.image);
				setValue('category', data.category);
				setValue('brand', data.brand);
				setValue('numberInStock', data.numberInStock);
				setValue('description', data.description);
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};

		fetchData();
	}, [productId, setValue]);

	const router = useRouter();

	const submitHandler = async ({
		name,
		slug,
		price,
		category,
		image,
		brand,
		numberInStock,
		description,
	}) => {
		try {
			dispatch({ type: 'UPDATE_REQUEST' });

			await axios.put(`/api/admin/products/${productId}`, {
				name,
				slug,
				price,
				category,
				image,
				brand,
				numberInStock,
				description,
			});

			dispatch({ type: 'UPDATE_SUCCESS' });

			toast.success('Product updated successfully');

			/* redirect the user back to the main page */
			router.push('/admin/products');
		} catch (err) {
			dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
			toast.error(getError(err));
		}
	};

	return (
		<Layout title={`Edit Product ID ${productId}`}>
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

				<div className="md:col-span-3">
					{loading ? (
						<div>Loading...</div>
					) : error ? (
						<div className="alert-error">{error}</div>
					) : (
						<form
							className="mx-auto max-w-screen-lg"
							onSubmit={handleSubmit(submitHandler)}
						>
							<h1 className="mb-4 text-xl">{`Edit Product ID ${productId}`}</h1>

							<div className="mb-4">
								<label htmlFor="name">Name</label>
								<input
									type="text"
									className="w-full rounded"
									id="name"
									autoFocus
									{...register('name', {
										required: 'Please enter the product name',
									})}
								/>
								{errors.name && (
									<div className="mt-1 text-red-500">{errors.name.message}</div>
								)}
							</div>

							<div className="mb-4">
								<label htmlFor="slug">Slug</label>
								<input
									type="text"
									className="w-full rounded"
									id="slug"
									{...register('slug', {
										required: 'Please enter the product slug',
									})}
								/>
								{errors.slug && (
									<div className="mt-1 text-red-500">{errors.slug.message}</div>
								)}
							</div>

							<div className="mb-4">
								<label htmlFor="price">Price</label>
								<input
									type="number"
									className="w-full rounded"
									id="price"
									{...register('price', {
										required: 'Please enter the product price',
									})}
								/>
								{errors.price && (
									<div className="mt-1 text-red-500">{errors.price.message}</div>
								)}
							</div>

							<div className="mb-4">
								<label htmlFor="image">Image</label>
								<input
									type="text"
									className="w-full rounded"
									id="image"
									{...register('image', {
										required: 'Please enter the product image',
									})}
								/>
								{errors.image && (
									<div className="mt-1 text-red-500">{errors.image.message}</div>
								)}
							</div>

							<div className="mb-4">
								<label htmlFor="category">Category</label>
								<input
									type="text"
									className="w-full rounded"
									id="category"
									{...register('category', {
										required: 'Please enter the product category',
									})}
								/>
								{errors.category && (
									<div className="mt-1 text-red-500">{errors.category.message}</div>
								)}
							</div>

							<div className="mb-4">
								<label htmlFor="brand">Brand</label>
								<input
									type="text"
									className="w-full rounded"
									id="brand"
									{...register('brand', {
										required: 'Please enter the product brand',
									})}
								/>
								{errors.brand && (
									<div className="mt-1 text-red-500">{errors.brand.message}</div>
								)}
							</div>

							<div className="mb-4">
								<label htmlFor="numberInStock">Number in Stock</label>
								<input
									type="number"
									className="w-full rounded"
									id="numberInStock"
									{...register('numberInStock', {
										required: 'Please enter the product number in stock',
									})}
								/>
								{errors.numberInStock && (
									<div className="mt-1 text-red-500">{errors.numberInStock.message}</div>
								)}
							</div>

							<div className="mb-4">
								<label htmlFor="description">Description</label>
								<textarea
									className="w-full rounded"
									id="description"
									rows="5"
									{...register('description', {
										required: 'Please enter product description',
									})}
								/>
								{errors.description && (
									<div className="mt-1 text-red-500">{errors.description.message}</div>
								)}
							</div>

							<div className="mb-4">
								<button disabled={loadingUpdate} className="primary-button uppercase">
									{loadingUpdate ? 'Loading' : 'Update'}
								</button>
							</div>

							<div className="mb-4">
								<Link href={`/admin/products`}>
									<a className="default-button uppercase">Back</a>
								</Link>
							</div>
						</form>
					)}
				</div>
			</div>
		</Layout>
	);
};

AdminProductEditPage.auth = { adminOnly: true };

export default AdminProductEditPage;
