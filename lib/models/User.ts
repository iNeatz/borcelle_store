import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
	clerkId: String,
	wishlist: {
		type: Array,
		default: [],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
})

const User = models.User || model('User', userSchema)

export default User
