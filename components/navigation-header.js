import Link from 'next/link';

const NavigationHeader = () => {
	return (
		<nav className="flex h-12 items-center justify-between px-[25px] shadow-md">
			{/** logo section start */}
			<Link href="/">
				<a className="text-lg font-bold">Superior Software Solutions</a>
			</Link>
			{/** logo section end */}

			{/** navigation links start */}
			<div>
				<Link href="#">
					<a className="p-2">About</a>
				</Link>
				<Link href="#">
					<a className="p-2">Contact</a>
				</Link>
			</div>
			{/** navigation links end */}
		</nav>
	);
};

export default NavigationHeader;
