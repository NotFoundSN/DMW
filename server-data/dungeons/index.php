<?php
/**
 * API para listar dungeons disponibles con su contenido completo
 * Escanea el directorio de dungeons y devuelve todos los datos en una sola respuesta
 */

// Configuración CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Manejar preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo permitir GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    $dungeons = [];
    $directory = __DIR__; // Directorio actual (donde están los JSON)

    // Escanear archivos .json en el directorio
    $files = glob($directory . '/*.json');

    foreach ($files as $file) {
        $filename = basename($file);

        // Leer el archivo JSON
        $content = file_get_contents($file);
        $data = json_decode($content, true);

        if ($data && isset($data['id'])) {
            // Agregar el contenido completo del archivo
            $dungeons[] = $data;
        }
    }

    // Ordenar por nombre
    usort($dungeons, function ($a, $b) {
        return strcmp($a['name'] ?? '', $b['name'] ?? '');
    });

    // Devolver respuesta
    http_response_code(200);
    echo json_encode($dungeons, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Internal server error',
        'message' => $e->getMessage()
    ]);
}
?>