'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import useCart from '@/lib/hooks/useCart'

const SuccessfulPayment = () => {
	const cart = useCart()

	useEffect(() => {
		cart.clearCart()
	}, [])

	return (
		<div className='h-screen flex flex-col justify-center items-center gap-5'>
			<p className='text-heading4-bold text-red-1'>Successful Payment</p>
			<p>Thank You for your Purchase</p>
			<Link
				href='/'
				className='p-4 border text-base-bold hover:bg-black hover:text-white'
			>
				CONTINUE TO SHOPPING
			</Link>
		</div>
	)
}

export default SuccessfulPayment
