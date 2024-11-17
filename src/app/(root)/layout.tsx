import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import MainProvider from "@/providers";
import Header from "@/components/layout/header";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Hono + Next 15",
	description: "Hono + Next 15 custom template",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					` min-h-screen w-screen flex flex-col gap-5 antialiased bg-slate-200`,
					fontSans.variable
				)}
			>
				<MainProvider>
					<Header />
					{children}
					<Toaster />
				</MainProvider>
			</body>
		</html>
	);
}
