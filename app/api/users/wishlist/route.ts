import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

import { connectToDB } from '@/lib/mongoose'
import User from '@/lib/models/User'

export const POST = async (req: NextRequest) => {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 403 })
		}

		await connectToDB()

		const user = await User.findOne({ clerkId: userId })

		if (!user) {
			return new NextResponse('User Not Found', { status: 404 })
		}

		const { productId } = await req.json()

		if (!productId) {
			return new NextResponse('Product ID Required', { status: 400 })
		}

		const isLiked = user.wishlist.includes(productId)

		if (isLiked) {
			user.wishlist = user.wishlist.filter((id: string) => id !== productId)
		} else {
			user.wishlist.push(productId)
		}

		await user.save()
		return NextResponse.json(user, { status: 200 })
	} catch (error) {
		console.log('[user_GET]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
