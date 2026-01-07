import { useState, useEffect } from "react";
import { dungeonsData } from "../../const/dungeonsData";
import dataService from "../../services/dataService";

export default function Dungeons() {
    const [selectedDungeonId, setSelectedDungeonId] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [allDungeonsData, setAllDungeonsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [useFallback, setUseFallback] = useState(false);

    // Cargar TODOS los datos de dungeons de una sola vez
    useEffect(() => {
        const loadAllDungeons = async () => {
            setLoading(true);
            setError(null);

            const result = await dataService.getDungeonsList();

            if (result.success && result.data && result.data.length > 0) {
                setAllDungeonsData(result.data);
                setSelectedDungeonId(result.data[0].id); // Seleccionar el primero por defecto
                setUseFallback(false);
            } else {
                // Fallback a datos locales si falla la API
                console.warn("Usando datos locales como fallback");
                setAllDungeonsData(dungeonsData);
                if (dungeonsData.length > 0) {
                    setSelectedDungeonId(dungeonsData[0].id);
                }
                setUseFallback(true);
                setError("No se pudieron cargar los datos del servidor. Mostrando datos locales.");
            }

            setLoading(false);
        };

        loadAllDungeons();
    }, []);

    // Obtener el dungeon actual seleccionado
    const currentDungeon = allDungeonsData.find(dungeon => dungeon.id === selectedDungeonId);

    // Si está cargando
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

    // Si no hay dungeons
    if (!currentDungeon || allDungeonsData.length === 0) {
        return (
            <div className="w-full max-w-2xl mx-auto px-4 py-6">
                <div className="bg-purple bg-opacity-95 rounded-lg p-8 shadow-2xl border-2 border-blue text-center">
                    <h1 className="text-white text-3xl font-bold drop-shadow-text mb-4">
                        Dungeons
                    </h1>
                    <p className="text-white text-lg">
                        No hay dungeons disponibles aún.
                    </p>
                    <p className="text-blue-light text-md mt-2">
                        Agrega datos de dungeons en el servidor
                    </p>
                </div>
            </div>
        );
    }

    const currentVariant = currentDungeon.variants[selectedVariant];

    const handleDungeonChange = (e) => {
        setSelectedDungeonId(e.target.value);
        setSelectedVariant(0); // Reset variant when changing dungeon
    };

    const handleVariantChange = (index) => {
        setSelectedVariant(index);
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
            {/* Dungeon Selector */}
            <div className="bg-purple-dark bg-opacity-90 rounded-lg p-4 shadow-lg">
                <label className="text-white font-bold text-lg mb-2 block">
                    Seleccionar Dungeon:
                </label>
                <select
                    value={selectedDungeonId}
                    onChange={handleDungeonChange}
                    className="w-full bg-purple-light text-white font-bold text-lg p-3 rounded-md border-2 border-blue"
                >
                    {allDungeonsData.map((dungeon) => (
                        <option key={dungeon.id} value={dungeon.id}>
                            {dungeon.name}
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

            {/* Difficulty Variant Selector */}
            <div className="bg-purple-dark bg-opacity-90 rounded-lg p-4 shadow-lg">
                <label className="text-white font-bold text-lg mb-2 block">
                    Dificultad:
                </label>
                <div className="flex gap-2 flex-wrap">
                    {currentDungeon.variants.map((variant, index) => (
                        <button
                            key={index}
                            onClick={() => handleVariantChange(index)}
                            className={`px-6 py-3 rounded-lg font-bold text-lg transition-all border-2 ${selectedVariant === index
                                ? "bg-blue text-white border-white shadow-lg scale-105"
                                : "bg-purple-dark text-blue-light border-purple-light hover:bg-purple hover:border-blue"
                                }`}
                        >
                            {variant.difficulty}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dungeon Info Card */}
            <div className="bg-purple bg-opacity-95 rounded-lg p-6 shadow-2xl border-2 border-blue">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-white text-4xl font-bold drop-shadow-text mb-2">
                        {currentDungeon.name}
                    </h1>
                    <h2 className="text-blue-light text-2xl font-bold drop-shadow-text">
                        {currentVariant.difficulty}
                    </h2>
                    {currentDungeon.description && (
                        <p className="text-white text-md mt-2 opacity-90">
                            {currentDungeon.description}
                        </p>
                    )}
                </div>

                {/* General Mechanics */}
                {currentVariant.generalMechanics && currentVariant.generalMechanics.length > 0 && (
                    <div className="bg-purple-dark bg-opacity-60 rounded-lg p-4 mb-6">
                        <h3 className="text-white font-bold text-xl mb-3 drop-shadow-text">
                            Mecánicas Generales:
                        </h3>
                        <ul className="space-y-2">
                            {currentVariant.generalMechanics.map((mechanic, index) => (
                                <li key={index} className="text-white text-lg leading-relaxed">
                                    <span className="text-blue-light font-bold mr-2">•</span>
                                    {mechanic}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Bosses */}
                {currentVariant.bosses && currentVariant.bosses.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-white font-bold text-xl drop-shadow-text">
                            Jefes:
                        </h3>
                        {currentVariant.bosses.map((boss, index) => (
                            <div
                                key={index}
                                className="bg-purple-dark bg-opacity-60 rounded-lg p-4 border border-purple-light"
                            >
                                <h4 className="text-blue-light font-bold text-lg mb-3">
                                    {boss.name}
                                </h4>
                                <ul className="space-y-2">
                                    {boss.mechanics.map((mechanic, mIndex) => (
                                        <li key={mIndex} className="text-white text-md leading-relaxed">
                                            <span className="text-blue-light font-bold mr-2">•</span>
                                            {mechanic}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
