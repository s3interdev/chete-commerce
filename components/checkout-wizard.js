const CheckoutWizard = ({ activeStep = 0 }) => {
	return (
		<div className="mb-5 mt-5 flex flex-wrap">
			{['Sign in', 'Shipping Address', 'Payment Method', 'Place Order'].map(
				(step, index) => (
					<div
						key={step}
						className={`flex-1 border-b-2 text-center 
              ${
								index <= activeStep
									? 'border-indigo-500   text-indigo-500'
									: 'border-gray-500 text-gray-500'
							}          
            `}
					>
						{step}
					</div>
				)
			)}
		</div>
	);
};

export default CheckoutWizard;
