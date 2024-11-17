import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
	return (
		<nav className="bg-white">
			<div className="container flex items-center justify-between  p-5">
				<Link className=" font-bold text-lg" href="/">
					NextHono
				</Link>

				<Button variant={"link"} asChild>
					<Link href="/api/docs">Docs</Link>
				</Button>
			</div>
		</nav>
	);
};

export default Header;
