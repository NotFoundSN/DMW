// Configuración de la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sora-system.com.ar/memoria/dmw';

/**
 * Servicio para obtener datos de arenas y dungeons desde el servidor
 */
class DataService {
    /**
     * Fetch genérico con manejo de errores
     */
    async fetchData(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Obtener datos de una arena específica
     * @param {string} arenaId - ID de la arena (ej: 'colo-hero')
     */
    async getArenaData(arenaId) {
        return this.fetchData(`/arena/${arenaId}.json`);
    }

    /**
     * Obtener datos de un dungeon específico
     * @param {string} dungeonId - ID del dungeon (ej: 'vajiramon')
     */
    async getDungeonData(dungeonId) {
        return this.fetchData(`/dungeon/${dungeonId}.json`);
    }

    /**
     * Obtener lista de todas las arenas disponibles
     */
    async getArenasList() {
        return this.fetchData('/arena/');
    }

    /**
     * Obtener lista de todos los dungeons disponibles
     */
    async getDungeonsList() {
        return this.fetchData('/dungeon/');
    }
}

export default new DataService();
