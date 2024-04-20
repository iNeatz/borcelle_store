import Image from 'next/image'
import Link from 'next/link'
import HeartButton from './HeartButton'

interface ProductCardProps {
	product: ProductType
	updateSignedInUser?: (updatedUser: UserType) => void
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	updateSignedInUser,
}) => {
	return (
		<Link
			href={`/products/${product._id}`}
			className='w-[220px] flex flex-col gap-2'
		>
			<Image
				src={product.media[0]}
				alt={product.title}
				width={250}
				height={300}
				className='h-[250px] rounded-lg object-cover'
			/>
			<div>
				<p className='text-base-bold'>{product.title}</p>
				<p className='text-small-medium text-grey-2'>{product.category}</p>
			</div>
			<div className='flex justify-between items-center'>
				<p className='text-body-bold'>${product.price.toFixed(2)}</p>
				<HeartButton product={product} updateSignedInUser={updateSignedInUser} />
			</div>
		</Link>
	)
}

export default ProductCard
