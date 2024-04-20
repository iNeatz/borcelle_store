import { NextRequest, NextResponse } from 'next/server'

import { connectToDB } from '@/lib/mongoose'
import User from '@/lib/models/User'
import { auth } from '@clerk/nextjs'

export const GET = async (req: NextRequest) => {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 403 })
		}

		await connectToDB()
      
		let user = await User.findOne({ clerkId: userId })

      //When user signs in for first time, we create a new User in database
		if (!user) {
			user = await User.create({ clerkId: userId })
			await user.save()
		}

		return NextResponse.json(user, { status: 201 })
	} catch (error) {
		console.log('[user_GET]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
