import Layout from '../components/layout';
import ProductItem from '../components/product-item';
import data from '../data/data';

const Home = () => {
	return (
		<Layout title="Home">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
				{data.products.map((product) => (
					<ProductItem product={product} key={product.slug}></ProductItem>
				))}
			</div>
		</Layout>
	);
};

export default Home;
