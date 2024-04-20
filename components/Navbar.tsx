'use client'

import { useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import { CircleUserIcon, MenuIcon, Search, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import useCart from '@/lib/hooks/useCart'
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
	const pathname = usePathname()
	const { user } = useUser()
	const cart = useCart()
	const router = useRouter()

	const [dropdownMenu, setDropdownMenu] = useState(false)
	const [query, setQuery] = useState('')

	return (
		<div className='sticky top-0 z-10 py-2 px-10 flex justify-between gap-2 items-center bg-white max-sm:px-2'>
			<Link href='/'>
				<Image src='/logo.png' alt='logo' width={130} height={100} />
			</Link>

			<div className='flex gap-4 text-base-bold max-lg:hidden'>
				<Link
					href='/'
					className={`hover:text-red-1 ${pathname === '/' && 'text-red-1'}`}
				>
					Home
				</Link>
				<Link
					href={user ? '/wishlist' : '/sign-in'}
					className={`hover:text-red-1 ${
						pathname === '/wishlist' && 'text-red-1'
					}`}
				>
					Wishlist
				</Link>
				<Link
					href={user ? '/orders' : '/sign-in'}
					className={`hover:text-red-1 ${
						pathname === '/orders' && 'text-red-1'
					}`}
				>
					Orders
				</Link>
			</div>

			<div className=' flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg'>
				<input
					className='outline-none max-sm:max-w-[150px]'
					placeholder='Search...'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && query !== '') {
							router.push(`/search/${query}`)
						}
					}}
				/>
				<Search
					className='cursor-pointer h-4 w-4 hover:text-red-1'
					onClick={() => query !== '' && router.push(`/search/${query}`)}
				/>
			</div>

			<div className='flex gap-3 items-center relative'>
				<Link
					href='/cart'
					className='flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden'
				>
					<ShoppingCart />
					<p className='text-base-bold'>Cart ({cart.cartItems.length})</p>
				</Link>

				<MenuIcon
					className='cursor-pointer lg:hidden'
					onClick={() => setDropdownMenu(!dropdownMenu)}
				/>

				{dropdownMenu && (
					<div className='absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border lg:hidden bg-white text-base-bold w-40'>
						<Link
							href='/'
							className={`hover:text-red-1 ${pathname === '/' && 'text-red-1'}`}
						>
							Home
						</Link>
						<Link
							href={user ? '/wishlist' : '/sign-in'}
							className={`hover:text-red-1 ${
								pathname === '/wishlist' && 'text-red-1'
							}`}
						>
							Wishlist
						</Link>
						<Link
							href={user ? '/orders' : '/sign-in'}
							className={`hover:text-red-1 ${
								pathname === '/orders' && 'text-red-1'
							}`}
						>
							Orders
						</Link>
						<Link
							href='/cart'
							className='flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white md:hidden'
						>
							<ShoppingCart />
							<p className='text-base-bold'>Cart ({cart.cartItems.length})</p>
						</Link>
					</div>
				)}

				{user ? (
					<UserButton afterSignOutUrl='/sign-in' />
				) : (
					<Link href='/sign-in'>
						<CircleUserIcon />
					</Link>
				)}
			</div>
		</div>
	)
}

export default Navbar
