import Link from 'next/link';

const ProductItem = ({ product }) => {
	return (
		<div className="card">
			<Link href={`/product/${product.slug}`}>
				<a>
					{/* eslint-disable @next/next/no-img-element */}
					<img
						src={product.image}
						alt={product.name}
						className="h-[450px] w-full rounded object-cover shadow"
					/>
				</a>
			</Link>

			<div className="flex flex-col items-center justify-center p-5">
				<Link href={`/product/${product.slug}`}>
					<a>
						<h2 className="text-lg">{product.name}</h2>
					</a>
				</Link>
				<p className="mb-2">{product.brand}</p>
				<p>${product.price}</p>
				<button className="primary-button uppercase" type="button">
					Add to cart
				</button>
			</div>
		</div>
	);
};

export default ProductItem;
