import { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Product from '../models/product';
import db from '../lib/db';
import { Store } from '../lib/store';
import Layout from '../components/layout';
import ProductItem from '../components/product-item';

export async function getServerSideProps() {
	await db.connect();

	const products = await Product.find().lean();

	return {
		props: {
			products: products.map(db.serializeDocToJSON),
		},
	};
}

const Home = ({ products }) => {
	const { state, dispatch } = useContext(Store);
	const { cart } = state;

	const addToCartHandler = async (product) => {
		const existingItem = cart.cartItems.find((i) => i.slug === product.slug);
		const quantity = existingItem ? existingItem.quantity + 1 : 1;
		const { data } = await axios.get(`/api/products/${product._id}`);

		if (data.countInStock < quantity) {
			return toast.error('The product is out of stock');
		}

		dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

		toast.success('Product added to your cart');
	};

	return (
		<Layout title="Home">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
				{products.map((product) => (
					<ProductItem
						product={product}
						key={product.slug}
						addToCartHandler={addToCartHandler}
					></ProductItem>
				))}
			</div>
		</Layout>
	);
};

export default Home;
