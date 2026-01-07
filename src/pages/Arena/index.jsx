import { useState } from "react";
import { colosseumHeroData, generalNotes, bugs } from "../../const/arenaData";

export default function Arena() {
	const [currentFloor, setCurrentFloor] = useState(0);
	const [selectedArena, setSelectedArena] = useState("colo-hero");

	const arenaData = colosseumHeroData;
	const totalFloors = arenaData.length;
	const floorInfo = arenaData[currentFloor];

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
			"Luz": { emoji: "💡", color: "#CA8A04" }, // Darker yellow/gold
			"Light": { emoji: "💡", color: "#CA8A04" }, // Darker yellow/gold
			"Metal": { emoji: "⚙️", color: "#52525B" }, // Darker gray
			"Steel": { emoji: "⚙️", color: "#52525B" }, // Darker gray
			"Viento": { emoji: "💨", color: "#0284C7" }, // Darker sky blue
			"Wind": { emoji: "💨", color: "#0284C7" }, // Darker sky blue
			"Hielo": { emoji: "❄️", color: "#2563EB" }, // Darker blue
			"Ice": { emoji: "❄️", color: "#2563EB" }, // Darker blue
			"Neutral": { emoji: "⚪", color: "#A855F7" },
			"Tierra": { emoji: "🪨", color: "#92400E" },
			"Land": { emoji: "🪨", color: "#92400E" },
			"Oscuridad": { emoji: "🌑", color: "#1F2937" },
			"Pitch Black": { emoji: "🌑", color: "#1F2937" },
			"Rayo": { emoji: "⚡", color: "#D97706" }, // Darker amber
			"Thunder": { emoji: "⚡", color: "#D97706" }, // Darker amber
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

	return (
		<div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
			{/* Arena Selector */}
			<div className="bg-purple-dark bg-opacity-90 rounded-lg p-4 shadow-lg">
				<label className="text-white font-bold text-lg mb-2 block">
					Seleccionar Arena:
				</label>
				<select
					value={selectedArena}
					onChange={(e) => setSelectedArena(e.target.value)}
					className="w-full bg-purple-light text-white font-bold text-lg p-3 rounded-md border-2 border-blue"
				>
					<option value="colo-hero">Colo Hero</option>
				</select>
			</div>

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
						{arenaData.map((floor, index) => (
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
				{generalNotes.map((note, index) => (
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
				{bugs.map((bug, index) => (
					<div key={index} className="mb-2">
						<span className="text-blue-light font-bold">{bug.title}: </span>
						<span className="text-white">{bug.desc}</span>
					</div>
				))}
			</div>
		</div>
	);
}
