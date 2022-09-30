import { useContext, useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Menu } from '@headlessui/react';
import { Store } from '../lib/store';
import DropdownLink from './dropdown-link';

const NavigationHeader = () => {
	const { status, data: session } = useSession();
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);

	/** render the component when number of cart items change */
	useEffect(() => {
		setCartItemsCount(
			cart.cartItems.reduce(
				(previousValue, currentValue) => previousValue + currentValue.quantity,
				0
			)
		);
	}, [cart.cartItems]);

	const signoutClickHandler = () => {
		Cookies.remove('cart');
		dispatch({ type: 'CART_RESET' });
		signOut({ callbackUrl: '/signin' });
	};

	return (
		<nav className="relative shadow-md">
			<div className="container mx-auto py-4">
				<div className="flex items-center justify-between px-4">
					{/** logo section start */}
					<Link href="/">
						<a className="text-2xl font-bold">chete men</a>
					</Link>
					{/** logo section end */}

					{/** navigation links start */}
					<div>
						<Link href="/cart">
							<a className="p-2">
								Cart
								{cartItemsCount > 0 && (
									<span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
										{cartItemsCount}
									</span>
								)}
							</a>
						</Link>

						{status === 'loading' ? (
							'Loading'
						) : session?.user ? (
							<Menu as="div" className="relative inline-block">
								<Menu.Button className="text-blue-500">{session.user.name}</Menu.Button>
								<Menu.Items className="absolute right-0 w-56 origin-top-right rounded bg-white shadow-lg">
									<Menu.Item>
										<DropdownLink className="dropdown-link" href="/profile">
											Profile
										</DropdownLink>
									</Menu.Item>
									<Menu.Item>
										<DropdownLink className="dropdown-link" href="/order-history">
											Order History
										</DropdownLink>
									</Menu.Item>
									<Menu.Item>
										<a className="dropdown-link" href="#" onClick={signoutClickHandler}>
											Sign out
										</a>
									</Menu.Item>
								</Menu.Items>
							</Menu>
						) : (
							<Link href="/signin">
								<a className="p-2">Sign in</a>
							</Link>
						)}
					</div>
					{/** navigation links end */}
				</div>
			</div>
		</nav>
	);
};

export default NavigationHeader;
