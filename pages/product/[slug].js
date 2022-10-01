import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Store } from '../../lib/store';
import Layout from '../../components/layout';
import data from '../../data/data';

const ProductPage = () => {
	const { state, dispatch } = useContext(Store);

	const router = useRouter();

	const { query } = useRouter();
	const { slug } = query;

	const product = data.products.find((prod) => prod.slug === slug);

	if (!product) {
		return <div>The product was not found</div>;
	}

	const addToCartHandler = () => {
		const existingItem = state.cart.cartItems.find((x) => x.slug === product.slug);
		const quantity = existingItem ? existingItem.quantity + 1 : 1;

		if (product.numberInStock < quantity) {
			alert('Sorry, the product is out of stock');
			return;
		}

		dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

		/** take user to shopping cart page */
		router.push('/cart');
	};

	return (
		<Layout title={product.name}>
			<div className="py-4">
				<Link href="/">
					<a className="default-button uppercase">Back to Homepage</a>
				</Link>
			</div>

			<div className="grid py-2 md:grid-cols-4 md:gap-3">
				{/* product image start */}
				<div className="md:col-span-2">
					{/* eslint-disable @next/next/no-img-element */}
					<img
						src={product.image}
						alt={product.name}
						className="h-[850px] w-full rounded object-cover object-center shadow"
					/>
				</div>
				{/* product image start */}

				{/* product features start */}
				<div>
					<ul>
						<li className="py-2">
							<h1 className="text-xl font-semibold">{product.name}</h1>
						</li>
						<li className="py-1">
							<span className="font-semibold">Product Category: </span>
							{product.category}
						</li>
						<li className="py-1">
							<span className="font-semibold">Brand: </span>
							{product.brand}
						</li>
						<li className="py-1">
							<span className="font-semibold">Rating: </span>
							{product.rating} <span className="font-semibold">in </span>
							{product.reviews}
							<span className="font-semibold"> reviews</span>
						</li>
						<li className="py-1">
							<span className="font-semibold">Description: </span>
							{product.description}
						</li>
					</ul>
				</div>
				{/* product features end */}

				{/* call to action start */}
				<div>
					<div className="card p-5">
						<div className="mb-2 flex justify-between">
							<div>Price</div>
							<div>${product.price}</div>
						</div>
						<div className="mb-2 flex justify-between">
							<div>Status</div>
							<div>{product.numberInStock > 0 ? 'In stock' : 'Unavailable'}</div>
						</div>
						<button
							className="primary-button w-full uppercase"
							onClick={addToCartHandler}
						>
							Add to cart
						</button>
					</div>
				</div>
				{/* call to action end */}
			</div>
		</Layout>
	);
};

export default ProductPage;
