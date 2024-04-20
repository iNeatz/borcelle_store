import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Borcella - Store Auth',
	description: "Ecommerce store for Borcelle made with Next.js 14",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>{children}</body>
			</html>
		</ClerkProvider>
	)
}