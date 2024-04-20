import { getProducts } from '@/lib/actions'
import ProductCard from './ProductCard'

const ProductsList = async () => {
	const products = await getProducts()

	console.log(products)

	return (
		<div className='flex flex-col items-center gap-10 py-8 px-5'>
			<p className='text-heading1-bold'>Products</p>
			{!products || products.length === 0 ? (
				<p className='text-body-bold'>No Products Found</p>
			) : (
				<div className='flex flex-wrap mx-auto gap-16 justify-center'>
					{products.map((product: ProductType) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
			)}
		</div>
	)
}

export default ProductsList
