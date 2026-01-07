import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@Components";
import { Arena, Clones, Dungeons } from "@Pages";
// Temporalmente ocultos - futuro uso
// import { Trans, Login } from "@Pages";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="arena" element={<Arena />} />
					<Route path="clones" element={<Clones />} />
					<Route path="dungeons" element={<Dungeons />} />
					{/* Temporalmente oculto - futuro uso */}
					{/* <Route path="trascender" element={<Trans />} /> */}
					{/* Temporalmente oculto - futuro backend */}
					{/* <Route path="login" element={<Login />} /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
