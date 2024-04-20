'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'

interface HeartProps {
	product: ProductType
	updateSignedInUser?: (updatedUser: UserType) => void
}

const HeartButton: React.FC<HeartProps> = ({ product, updateSignedInUser }) => {
	const router = useRouter()
	const { user } = useUser()

	const [loading, setLoading] = useState(false)
	const [isLiked, setIsLiked] = useState(false)

	const getUser = async () => {
		try {
			setLoading(true)
			const res = await fetch('/api/users')
			const data = await res.json()
			setIsLiked(data.wishlist.includes(product._id))
			setLoading(false)
		} catch (error) {
			console.log('[user_GET]', error)
		}
	}

	useEffect(() => {
		if (user) {
			getUser()
		}
	}, [user])

	const handleLike = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()

		try {
			if (!user) {
				router.push('/sign-in')
				return
			}

			setLoading(true)
			const res = await fetch('/api/users/wishlist', {
				method: 'POST',
				body: JSON.stringify({ productId: product._id }),
			})
			const updatedUser = await res.json()
			setIsLiked(updatedUser.wishlist.includes(product._id))
			updateSignedInUser && updateSignedInUser(updatedUser)
		} catch (error) {
			console.log('[wishlist_POST]', error)
		}
	}
	return (
		<button onClick={handleLike}>
			<Heart
				fill={`${isLiked ? 'red' : 'white'}`}
				className={`${isLiked && 'text-red-1'}`}
			/>
		</button>
	)
}

export default HeartButton
