import Head from 'next/head';

import NavigationFooter from './navigation-footer';
import NavigationHeader from './navigation-header';

const Layout = ({ title, children }) => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="E-commerce web application built using Next.JS, Tailwind CSS and MongoDB"
				/>
				<link rel="icon" type="image/png" href="/favicon.png" />
				<title>
					{title
						? title + ' | Chete by Superior Software Solutions'
						: ' | Chete by Superior Software Solutions'}
				</title>
			</Head>

			{/** body section start */}
			<div className="flex min-h-screen flex-col justify-between">
				{/** header section start start */}
				<header>
					<NavigationHeader />
				</header>
				{/** header section start end */}

				{/** main content section start */}
				<main className="container m-auto mt-4 px-4">{children}</main>
				{/** main content section end */}

				{/** footer section start start */}
				<footer>
					<NavigationFooter />
				</footer>
				{/** footer section start start */}
			</div>
			{/** body section end */}
		</>
	);
};

export default Layout;
