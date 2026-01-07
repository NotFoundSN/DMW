import { useState, useEffect } from "react";
import { colosseumHeroData, generalNotes, bugs } from "../../const/arenaData";
import dataService from "../../services/dataService";

export default function Arena() {
	const [currentFloor, setCurrentFloor] = useState(0);
	const [selectedArenaId, setSelectedArenaId] = useState("colo-hero");
	const [allArenasData, setAllArenasData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [useFallback, setUseFallback] = useState(false);

	// Cargar TODOS los datos de arenas de una sola vez
	useEffect(() => {
		const loadAllArenas = async () => {
			setLoading(true);
			setError(null);

			const result = await dataService.getArenasList();

			if (result.success && result.data && result.data.length > 0) {
				setAllArenasData(result.data);
				setUseFallback(false);
			} else {
				// Fallback a datos locales si falla la API
				console.warn("Usando datos locales como fallback");
				setAllArenasData([{
					id: "colo-hero",
					name: "Colo Hero",
					floors: colosseumHeroData,
					generalNotes: generalNotes,
					bugs: bugs
				}]);
				setUseFallback(true);
				setError("No se pudieron cargar los datos del servidor. Mostrando datos locales.");
			}

			setLoading(false);
		};

		loadAllArenas();
	}, []);

	// Obtener la arena actual seleccionada
	const currentArenaData = allArenasData.find(arena => arena.id === selectedArenaId);

	// Si no hay datos aún, mostrar loading
	if (loading) {
		return (
			<div className="w-full max-w-2xl mx-auto px-4 py-6 flex justify-center items-center min-h-screen">
				<div className="bg-purple bg-opacity-95 rounded-lg p-8 shadow-2xl border-2 border-blue">
					<div className="text-center">
						<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-light mx-auto mb-4"></div>
						<p className="text-white text-xl font-bold">Cargando datos...</p>
					</div>
				</div>
			</div>
		);
	}

	// Si no hay arena seleccionada, mostrar error
	if (!currentArenaData) {
		return (
			<div className="w-full max-w-2xl mx-auto px-4 py-6 flex justify-center items-center min-h-screen">
				<div className="bg-purple bg-opacity-95 rounded-lg p-8 shadow-2xl border-2 border-red-500">
					<div className="text-center">
						<p className="text-red-500 text-2xl font-bold mb-4">❌ Error</p>
						<p className="text-white text-lg">No se pudieron cargar los datos de la arena.</p>
					</div>
				</div>
			</div>
		);
	}

	const totalFloors = currentArenaData.floors.length;
	const floorInfo = currentArenaData.floors[currentFloor];

	// Mapeo de colores de atributos según el juego
	const getAttributeStyle = (attribute) => {
		const styles = {
			"Data": { backgroundColor: "#1E40AF", borderColor: "#3B82F6" }, // Dark Blue
			"Vaccine": { backgroundColor: "#15803D", borderColor: "#22C55E" }, // Dark Green
			"Vacuna": { backgroundColor: "#15803D", borderColor: "#22C55E" }, // Dark Green
			"Virus": { backgroundColor: "#991B1B", borderColor: "#DC2626" }, // Dark Red
			"No Attribute": { backgroundColor: "#4B5563", borderColor: "#6B7280" }, // Dark Gray
			"Unknown": { backgroundColor: "#7E22CE", borderColor: "#A855F7" } // Dark Purple
		};
		return styles[attribute] || { backgroundColor: "#6B21A8", borderColor: "#A78BFA" };
	};

	// Mapeo de emojis y colores para elementos
	const getElementInfo = (element) => {
		const elements = {
			"Fuego": { emoji: "🔥", color: "#DC2626" },
			"Fire": { emoji: "🔥", color: "#DC2626" },
			"Luz": { emoji: "💡", color: "#CA8A04" },
			"Light": { emoji: "💡", color: "#CA8A04" },
			"Metal": { emoji: "⚙️", color: "#52525B" },
			"Steel": { emoji: "⚙️", color: "#52525B" },
			"Viento": { emoji: "💨", color: "#0284C7" },
			"Wind": { emoji: "💨", color: "#0284C7" },
			"Hielo": { emoji: "❄️", color: "#2563EB" },
			"Ice": { emoji: "❄️", color: "#2563EB" },
			"Neutral": { emoji: "⚪", color: "#A855F7" },
			"Tierra": { emoji: "🪨", color: "#92400E" },
			"Land": { emoji: "🪨", color: "#92400E" },
			"Oscuridad": { emoji: "🌑", color: "#1F2937" },
			"Pitch Black": { emoji: "🌑", color: "#1F2937" },
			"Rayo": { emoji: "⚡", color: "#D97706" },
			"Thunder": { emoji: "⚡", color: "#D97706" },
			"Agua": { emoji: "💧", color: "#0EA5E9" },
			"Water": { emoji: "💧", color: "#0EA5E9" },
			"Madera": { emoji: "🌿", color: "#16A34A" },
			"Wood": { emoji: "🌿", color: "#16A34A" }
		};
		return elements[element] || { emoji: "❓", color: "#6B7280" };
	};

	const handlePrevious = () => {
		if (currentFloor > 0) {
			setCurrentFloor(currentFloor - 1);
		}
	};

	const handleNext = () => {
		if (currentFloor < totalFloors - 1) {
			setCurrentFloor(currentFloor + 1);
		}
	};

	const handleFloorSelect = (e) => {
		setCurrentFloor(parseInt(e.target.value));
	};

	const handleArenaChange = (e) => {
		setSelectedArenaId(e.target.value);
		setCurrentFloor(0); // Reset to first floor when changing arena
	};

	return (
		<div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
			{/* Arena Selector */}
			<div className="bg-purple-dark bg-opacity-90 rounded-lg p-4 shadow-lg">
				<label className="text-white font-bold text-lg mb-2 block">
					Seleccionar Arena:
				</label>
				<select
					value={selectedArenaId}
					onChange={handleArenaChange}
					className="w-full bg-purple-light text-white font-bold text-lg p-3 rounded-md border-2 border-blue"
				>
					{allArenasData.map((arena) => (
						<option key={arena.id} value={arena.id}>
							{arena.name}
						</option>
					))}
				</select>
			</div>

			{/* Fallback Warning */}
			{useFallback && (
				<div className="bg-yellow-600 bg-opacity-90 rounded-lg p-3 shadow-lg border-2 border-yellow-400">
					<p className="text-white text-sm">
						⚠️ {error}
					</p>
				</div>
			)}

			{/* Floor Card */}
			<div className="bg-purple bg-opacity-95 rounded-lg p-6 shadow-2xl border-2 border-blue">
				{/* Header */}
				<div className="text-center mb-6">
					<h1 className="text-white text-4xl font-bold drop-shadow-text mb-2">
						Piso {floorInfo.floor}
					</h1>
					<h2 className="text-blue-light text-3xl font-bold drop-shadow-text">
						{floorInfo.digimon}
					</h2>
				</div>

				{/* Attributes */}
				<div className="flex justify-center gap-4 mb-6">
					<div
						className="px-4 py-2 rounded-lg border-2 shadow-lg"
						style={getAttributeStyle(floorInfo.attribute)}
					>
						<span className="text-white font-bold text-sm">Atributo: </span>
						<span className="text-white font-bold text-lg">{floorInfo.attribute}</span>
					</div>
					<div
						className="px-4 py-2 rounded-lg border-2 shadow-lg flex items-center gap-2"
						style={{ backgroundColor: getElementInfo(floorInfo.element).color + "DD", borderColor: getElementInfo(floorInfo.element).color }}
					>
						<span className="text-2xl">{getElementInfo(floorInfo.element).emoji}</span>
						<div>
							<span className="text-white font-bold text-sm">Elemento: </span>
							<span className="text-white font-bold text-lg">{floorInfo.element}</span>
						</div>
					</div>
				</div>

				{/* Mechanics */}
				<div className="bg-purple-dark bg-opacity-60 rounded-lg p-4 mb-6">
					<h3 className="text-white font-bold text-xl mb-3 drop-shadow-text">
						Mecánicas:
					</h3>
					<ul className="space-y-2">
						{floorInfo.mechanics.map((mechanic, index) => (
							<li key={index} className="text-white text-lg leading-relaxed">
								<span className="text-blue-light font-bold mr-2">•</span>
								{mechanic}
							</li>
						))}
					</ul>
				</div>

				{/* Progress Indicator */}
				<div className="text-center mb-4">
					<span className="text-white font-bold text-lg">
						Piso {currentFloor + 1} de {totalFloors}
					</span>
				</div>

				{/* Navigation Buttons */}
				<div className="flex gap-4">
					<button
						onClick={handlePrevious}
						disabled={currentFloor === 0}
						className={`flex-1 py-4 rounded-lg font-bold text-xl transition-all ${currentFloor === 0
							? "bg-purple-dark opacity-50 cursor-not-allowed text-gray-400"
							: "bg-purple-dark hover:bg-purple text-white drop-shadow-button border-2 border-purple-light hover:border-blue-light"
							}`}
					>
						← Anterior
					</button>
					<button
						onClick={handleNext}
						disabled={currentFloor === totalFloors - 1}
						className={`flex-1 py-4 rounded-lg font-bold text-xl transition-all ${currentFloor === totalFloors - 1
							? "bg-purple-dark opacity-50 cursor-not-allowed text-gray-400"
							: "bg-blue hover:bg-blue-light text-white drop-shadow-button border-2 border-purple-light hover:border-white"
							}`}
					>
						Siguiente →
					</button>
				</div>

				{/* Quick Floor Selector */}
				<div className="mt-4">
					<label className="text-white font-bold text-sm mb-2 block text-center">
						Saltar a piso:
					</label>
					<select
						value={currentFloor}
						onChange={handleFloorSelect}
						className="w-full bg-purple-light text-white font-bold text-lg p-2 rounded-md border-2 border-blue"
					>
						{currentArenaData.floors.map((floor, index) => (
							<option key={index} value={index}>
								Piso {floor.floor} - {floor.digimon}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* General Notes */}
			<div className="bg-purple-dark bg-opacity-90 rounded-lg p-4 shadow-lg">
				<h3 className="text-white font-bold text-xl mb-3 drop-shadow-text">
					📝 Notas Generales
				</h3>
				{currentArenaData.generalNotes.map((note, index) => (
					<div key={index} className="mb-2">
						<span className="text-blue-light font-bold">{note.title}: </span>
						<span className="text-white">{note.desc}</span>
					</div>
				))}
			</div>

			{/* Bugs */}
			<div className="bg-purple-dark bg-opacity-90 rounded-lg p-4 shadow-lg">
				<h3 className="text-white font-bold text-xl mb-3 drop-shadow-text">
					🐛 Bugs Conocidos
				</h3>
				{currentArenaData.bugs.map((bug, index) => (
					<div key={index} className="mb-2">
						<span className="text-blue-light font-bold">{bug.title}: </span>
						<span className="text-white">{bug.desc}</span>
					</div>
				))}
			</div>
		</div>
	);
}
