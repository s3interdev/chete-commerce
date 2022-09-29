const NavigationFooter = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="flex h-10 items-center justify-center shadow-inner">
			<p>© {currentYear} Superior Software Solutions</p>
		</footer>
	);
};

export default NavigationFooter;
