export const getProducts = async () => {
	const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
		cache: 'no-store',
	})

	return await products.json()
}

export const getCollections = async () => {
	const collections = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/collections`
	)

	return await collections.json()
}

export const getCollectionDetails = async (collectionId: string) => {
	const products = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`
	)

	return await products.json()
}

export const getProductDetails = async (productId: string) => {
	const product = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
		{
			cache: 'no-store',
		}
	)

	return await product.json()
}

export const getSearchedProducts = async (query: string) => {
	const searchedProducts = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`
	)

	return await searchedProducts.json()
}

export const getOrders = async (customerId: string) => {
	const orders = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`
	)

	return await orders.json()
}

export const getRelatedProducts = async (productId: string) => {
	const relatedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`)

	return await relatedProducts.json()
}