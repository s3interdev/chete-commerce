import bcrypt from 'bcryptjs';

const data = {
	users: [
		{
			name: 'Michael',
			email: 'michael.owuor@gmail.com',
			password: bcrypt.hashSync('Pass@word8475'),
			isAdmin: true,
		},
		{
			name: 'S3InterDev',
			email: 's3interdev@gmail.com',
			password: bcrypt.hashSync('Pass@word8475'),
			isAdmin: false,
		},
	],
	products: [
		{
			name: 'White Hoodie',
			slug: 'white-hoodie',
			category: 'casuals',
			image: '/images/hoodie-01.jpg',
			price: 55,
			brand: 'Deacons',
			rating: 4.0,
			reviews: 5,
			numberInStock: 20,
			description:
				'Hooded sweatshirt, jacket, or other top. Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia. Nihil molestiae consequatur, vel illum qui dolorem eum. Nihil molestiae consequatur, vel illum qui dolorem eum.',
		},
		{
			name: 'Beige Hoodie',
			slug: 'beige-hoodie',
			category: 'casuals',
			image: '/images/hoodie-02.jpg',
			price: 89,
			brand: 'Ralph Lauren',
			rating: 4.0,
			reviews: 8,
			numberInStock: 21,
			description:
				'Hooded sweatshirt, jacket, or other top. Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia. Nihil molestiae consequatur, vel illum qui dolorem eum. Nihil molestiae consequatur, vel illum qui dolorem eum.',
		},
		{
			name: 'Black Hoodie',
			slug: 'black-hoodie',
			category: 'casuals',
			image: '/images/hoodie-03.jpg',
			price: 144,
			brand: 'Tommy Hilfiger',
			rating: 4.5,
			reviews: 3,
			numberInStock: 13,
			description:
				'Hooded sweatshirt, jacket, or other top. Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia. Nihil molestiae consequatur, vel illum qui dolorem eum. Nihil molestiae consequatur, vel illum qui dolorem eum.',
		},
		{
			name: 'Blue Jeans',
			slug: 'blue-jeans',
			category: 'pants',
			image: '/images/pants-01.jpg',
			price: 21,
			brand: 'Lewis Bogus',
			rating: 3.5,
			reviews: 13,
			numberInStock: 13,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.',
		},
		{
			name: 'Woolen Trousers',
			slug: 'woolen-trousers',
			category: 'pants',
			image: '/images/pants-02.jpg',
			price: 55,
			brand: 'Cerrutti',
			rating: 4.5,
			reviews: 21,
			numberInStock: 8,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.',
		},
		{
			name: 'Canvas Toursers',
			slug: 'canvas-trousers',
			category: 'pants',
			image: '/images/pants-03.jpg',
			price: 34,
			brand: 'Safari Joe',
			rating: 5.0,
			reviews: 5,
			numberInStock: 5,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.',
		},
		{
			name: 'Woolen Suit',
			slug: 'woolen-suit',
			category: 'suits',
			image: '/images/suit-01.jpg',
			price: 144,
			brand: 'Raymonds',
			rating: 4.5,
			reviews: 13,
			numberInStock: 21,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.',
		},
		{
			name: 'Cashmere Suit',
			slug: 'cashmere-suit',
			category: 'suits',
			image: '/images/suit-02.jpg',
			price: 233,
			brand: 'Kants',
			rating: 4.5,
			reviews: 1,
			numberInStock: 3,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.',
		},
	],
};

export default data;
