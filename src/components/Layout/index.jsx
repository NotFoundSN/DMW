import { Outlet } from "react-router-dom";
import Navbar from "../NavBar";
import banner from "@Assets/dmw-banner-compact-v2.png";

export default function Layout() {
	return (
		<>
			<div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-purple-dark via-purple to-blue-dark">
				<img src={banner} className="w-full max-h-40 object-cover" />
				<Navbar />
				<Outlet />
			</div>
		</>
	);
}
