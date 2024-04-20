'use client'

import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { MinusCircle, PlusCircle, Trash } from 'lucide-react'

import useCart from '@/lib/hooks/useCart'
import { useRouter } from 'next/navigation'

const Cart = () => {
	const router = useRouter()
	const cart = useCart()
	const { user } = useUser()

	const total = cart.cartItems.reduce(
		(acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
		0
	)
	const totalRounded = parseFloat(total.toFixed(2))

	const customer = {
		clerkId: user?.id,
		fullName: user?.fullName,
		emailAddress: user?.emailAddresses[0].emailAddress,
	}

	const handleCheckout = async () => {
		try {
			if (!user) {
				router.push('/sign-in')
				return
			}

			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
				method: 'POST',
				body: JSON.stringify({
					cartItems: cart.cartItems,
					customer,
				}),
			})

			const data = await res.json()

			window.location.href = data.url
		} catch (error) {
			console.log('[checkout_POST]', error)
		}
	}

	return (
		<div className='flex max-lg:flex-col gap-20 py-16 px-10'>
			<div className='lg:w-2/3 w-full'>
				<p className='text-heading3-bold'>Shopping Cart</p>
				<hr className='my-6' />

				{cart.cartItems.length === 0 ? (
					<p className='text-body-bold'>No Items in Cart</p>
				) : (
					<div>
						{cart.cartItems.map((cartItem) => (
							<div
								className='flex max-sm:flex-col max-sm:items-start max-sm:gap-5 hover:bg-grey-1 px-6 py-5 w-full items-center justify-between rounded-xl '
								key={cartItem.item._id}
							>
								<div className='flex items-center'>
									<Image
										src={cartItem.item.media[0]}
										alt='product'
										width={100}
										height={100}
										className='rounded-lg w-32 h-32 object-cover'
									/>

									<div className='flex flex-col gap-3 ml-4'>
										<div className='flex flex-col gap-3'>
											<p className='text-body-bold'>{cartItem.item.title}</p>
											<div className='flex gap-5'>
												{cartItem.color && (
													<p className='text-small-medium border py-1 px-2 rounded-full'>
														{cartItem.color}
													</p>
												)}
												{cartItem.size && (
													<p className='text-small-medium py-1 px-2'>
														{cartItem.size}
													</p>
												)}
											</div>
										</div>
										<p className='text-body-bold bg-black text-white rounded-full py-2 px-1 w-20 h-8 text-center'>
											${cartItem.item.price.toFixed(2)}
										</p>
									</div>
								</div>

								<div className='flex gap-4 items-center'>
									<MinusCircle
										className='hover:text-red-1 cursor-pointer'
										onClick={() => cart.decreaseQuantity(cartItem.item._id)}
									/>
									<p className='text-body-bold select-none'>
										{cartItem.quantity}
									</p>
									<PlusCircle
										className='hover:text-red-1 cursor-pointer'
										onClick={() => cart.increaseQuantity(cartItem.item._id)}
									/>
								</div>

								<Trash
									className='hover:text-red-1 cursor-pointer'
									onClick={() => cart.removeItem(cartItem.item._id)}
								/>
							</div>
						))}
					</div>
				)}
			</div>

			<div className='w-full lg:w-1/3  flex flex-col justify-between gap-8 bg-grey-1 rounded-lg px-4 py-5'>
				<div className='flex flex-col gap-4'>
					<p className='text-heading4-bold pb-4'>
						Summary{' '}
						<span className='text-small-medium text-grey-2'>
							(
							{`${cart.cartItems.length} ${
								cart.cartItems.length > 1 ? 'items' : 'item'
							}`}
							)
						</span>
					</p>
					<hr className='my-4' />

					{cart.cartItems.map((cartItem) => (
						<div
							className='text-base-bold flex justify-between'
							key={cartItem.item._id}
						>
							<span>{cartItem.item.title}</span>
							<span>{`${cartItem.quantity}*${cartItem.item.price} = ${
								cartItem.quantity * cartItem.item.price
							}`}</span>
						</div>
					))}
				</div>

				<div>
					<hr className='my-6' />
					<div className='flex justify-between text-body-semibold mb-6'>
						<span>Total</span>
						<span>$ {totalRounded}</span>
					</div>

					<button
						className='border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white'
						onClick={handleCheckout}
					>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</div>
	)
}

export default Cart
