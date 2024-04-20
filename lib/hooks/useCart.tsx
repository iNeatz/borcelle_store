import { create } from 'zustand'
import { toast } from 'react-hot-toast'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ShoppingCart } from 'lucide-react'

interface CartItem {
	item: ProductType
	quantity: number
	color?: string
	size?: string
}

interface CartStore {
	cartItems: CartItem[]
	addItem: (item: CartItem) => void
	removeItem: (_id: string) => void
	increaseQuantity: (_id: string) => void
	decreaseQuantity: (_id: string) => void
	clearCart: () => void
}

const useCart = create(
	persist<CartStore>(
		(set, get) => ({
			cartItems: [],
			addItem: (data: CartItem) => {
				const { item, quantity, color, size } = data
				const currentItems = get().cartItems //items already in cart
				const isExistingItem = currentItems.find(
					(cardItem) => cardItem.item._id === item._id
				)

				if (isExistingItem) {
					return toast('Item already in cart', { icon: <ShoppingCart /> })
				}

				set({ cartItems: [...currentItems, { item, quantity, color, size }] })
				toast.success('Item added to cart', { icon: <ShoppingCart /> })
			},
			removeItem: (idToRemove: string) => {
				const currentItems = get().cartItems //items already in cart
				const isExistingItem = currentItems.find(
					(cardItem) => cardItem.item._id === idToRemove
				)

				if (!isExistingItem) {
					return toast('Item not in Cart')
				}

				const updatedItems = currentItems.filter(
					(cardItem) => cardItem.item._id !== idToRemove
				)

				set({ cartItems: updatedItems })
				toast.success('Item deleted from cart successfully')
			},
			increaseQuantity: (idToIncrease: string) => {
				const updatedItems = get().cartItems.map((cartItem) =>
					cartItem.item._id === idToIncrease
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				)

				set({ cartItems: updatedItems })
				toast.success('Quantity increased!')
			},
			decreaseQuantity: (idToDecrease: string) => {
				const updatedItems = get().cartItems.map((cartItem) =>
					cartItem.item._id === idToDecrease
						? { ...cartItem, quantity: cartItem.quantity - 1 }
						: cartItem
				)

				set({ cartItems: updatedItems })
				toast.success('Quantity decreased!')
			},
			clearCart: () => {
				set({ cartItems: [] })
			},
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
)

export default useCart
