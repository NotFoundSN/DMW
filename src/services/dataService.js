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
     * Obtener lista completa de todas las arenas con sus datos
     * El PHP devuelve todo el contenido de los JSON en una sola respuesta
     */
    async getArenasList() {
        return this.fetchData('/arena/');
    }

    /**
     * Obtener lista completa de todos los dungeons con sus datos
     * El PHP devuelve todo el contenido de los JSON en una sola respuesta
     */
    async getDungeonsList() {
        return this.fetchData('/dungeon/');
    }
}

export default new DataService();
