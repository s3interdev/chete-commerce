import Link from 'next/link';

const NavigationHeader = () => {
	return (
		<nav className="relative shadow-md">
			<div className="container mx-auto py-4">
				<div className="flex items-center justify-between px-4">
					{/** logo section start */}
					<Link href="/">
						<a className="text-2xl font-bold">Chete Men</a>
					</Link>
					{/** logo section end */}

					{/** navigation links start */}
					<div>
						<Link href="/cart">
							<a className="p-2">Cart</a>
						</Link>
						<Link href="/signin">
							<a className="p-2">Sign in</a>
						</Link>
					</div>
					{/** navigation links end */}
				</div>
			</div>
		</nav>
	);
};

export default NavigationHeader;
