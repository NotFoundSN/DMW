# 🎮 DMW - Digital Masters World Guide

Guía interactiva para Digital Masters World con información sobre Arenas y Dungeons.

## 🚀 Configuración de Datos Dinámicos

Este proyecto ahora soporta carga dinámica de datos desde un servidor externo.

### 📁 Estructura de Archivos

```
dollarsDmo/
├── server-data/          # Archivos para subir a tu servidor
│   ├── .htaccess        # Configuración CORS
│   ├── arenas/
│   │   └── colo-hero.json
│   └── dungeons/
│       └── vajiramon.json
├── src/
│   ├── services/
│   │   └── dataService.js  # Servicio de API
│   └── pages/
│       └── Arena/
│           └── index.jsx    # Componente con carga dinámica
└── dev-server.js        # Servidor de desarrollo local
```

## 🔧 Configuración

### 1. Desarrollo Local

Para probar localmente con el servidor de desarrollo:

```bash
# Instalar dependencias del servidor (si no tienes express)
npm install express cors

# Iniciar el servidor de datos
node dev-server.js

# En otra terminal, iniciar la app React
npm run dev
```

El servidor de desarrollo correrá en `http://localhost:3001` y servirá los archivos JSON.

### 2. Producción con Servidor Externo

#### Paso 1: Subir archivos al servidor

1. Conecta por FTP a tu hosting
2. Crea una carpeta (ej: `public_html/dmw-data/`)
3. Sube todos los archivos de `server-data/` manteniendo la estructura:
   ```
   dmw-data/
   ├── .htaccess
   ├── arenas/
   │   └── colo-hero.json
   └── dungeons/
       └── vajiramon.json
   ```

#### Paso 2: Configurar la URL de la API

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_API_BASE_URL=https://tu-dominio.com/dmw-data
```

#### Paso 3: Verificar que funcione

Abre en tu navegador:
- `https://tu-dominio.com/dmw-data/arenas/colo-hero.json`

Deberías ver el JSON.

## 📝 Actualizar Datos

### Método 1: Editar y subir por FTP

1. Edita el archivo JSON correspondiente en `server-data/`
2. Sube el archivo actualizado por FTP
3. La app cargará los nuevos datos automáticamente

### Método 2: Editar directamente en el servidor

Si tu hosting tiene un editor de archivos, puedes editar directamente los JSON en el servidor.

## 🎯 Cómo Funciona

1. **Carga Dinámica**: La app intenta cargar datos desde `VITE_API_BASE_URL`
2. **Fallback Automático**: Si falla, usa datos locales como respaldo
3. **Indicador Visual**: Muestra un banner amarillo cuando usa datos locales

## 🌐 Endpoints Disponibles

- **Colo Hero Arena**: `/arenas/colo-hero.json`
- **Vajiramon Dungeon**: `/dungeons/vajiramon.json`

## 📦 Agregar Nuevas Arenas/Dungeons

### Para agregar una nueva arena:

1. Crea `server-data/arenas/nueva-arena.json`:
```json
{
  "name": "Nueva Arena",
  "id": "nueva-arena",
  "floors": [
    {
      "floor": 1,
      "digimon": "Nombre",
      "attribute": "Data/Virus/Vacuna",
      "element": "Fuego/Agua/etc",
      "mechanics": ["Mecánica 1", "Mecánica 2"]
    }
  ],
  "generalNotes": [],
  "bugs": []
}
```

2. Sube el archivo a tu servidor
3. Actualiza el selector en el componente Arena

### Para agregar un nuevo dungeon:

1. Crea `server-data/dungeons/nuevo-dungeon.json`:
```json
{
  "id": "nuevo-dungeon",
  "name": "Nuevo Dungeon",
  "description": "Descripción",
  "variants": [
    {
      "difficulty": "SSS",
      "generalMechanics": [],
      "bosses": [
        {
          "name": "Boss Name",
          "mechanics": ["Mecánica 1"]
        }
      ]
    }
  ]
}
```

2. Sube el archivo a tu servidor

## 🛠️ Troubleshooting

### Error de CORS

Si ves errores de CORS en la consola:
- Verifica que el archivo `.htaccess` esté en la raíz de `dmw-data/`
- Si tu hosting no soporta `.htaccess`, contacta a soporte para habilitar CORS

### No carga los datos

1. Verifica que `VITE_API_BASE_URL` esté configurado correctamente
2. Abre la URL del JSON en el navegador para verificar que sea accesible
3. Revisa la consola del navegador para ver errores específicos

### Datos desactualizados

El cache está configurado a 5 minutos. Para forzar actualización:
- Limpia el cache del navegador
- O espera 5 minutos después de actualizar el JSON

## 📄 Licencia

MIT
