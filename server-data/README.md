# 📁 Server Data - Archivos para Subir al Servidor

Esta carpeta contiene todos los archivos que debes subir a tu servidor PHP/HTML.

## 📂 Estructura

```
server-data/
├── .htaccess           # Configuración de CORS y cache
├── arenas/
│   ├── index.php       # API que lista arenas disponibles
│   └── colo-hero.json  # Datos de Colo Hero
└── dungeons/
    ├── index.php       # API que lista dungeons disponibles
    └── vajiramon.json  # Datos de Vajiramon
```

## 🚀 Cómo Funciona

### Archivos PHP (`index.php`)

Los archivos `index.php` en cada carpeta:
- **Escanean automáticamente** el directorio buscando archivos `.json`
- **Leen cada JSON** y extraen `id`, `name` y `description`
- **Generan una lista** en formato JSON
- **Protegen con CORS** para que solo tu app pueda acceder

**Ventajas:**
- ✅ Totalmente dinámico: Solo subes un JSON y aparece automáticamente
- ✅ No necesitas editar archivos de índice
- ✅ Fácil de migrar a base de datos en el futuro
- ✅ Protección CORS incluida

## 📤 Subir al Servidor

### Opción 1: FTP (Recomendado)

1. Conecta por FTP a tu servidor
2. Navega a la carpeta pública (ej: `public_html/memoria/dmw/`)
3. Sube las carpetas `arena/` y `dungeon/` con todo su contenido
4. Asegúrate de que los archivos `.php` tengan permisos de ejecución (755)

### Opción 2: Panel de Control (cPanel, Plesk, etc.)

1. Accede al gestor de archivos
2. Navega a `public_html/memoria/dmw/`
3. Sube las carpetas manteniendo la estructura

## 🔧 Configuración CORS

Si necesitas restringir el acceso solo a tu dominio, edita los archivos `index.php`:

```php
// Cambiar esta línea:
header('Access-Control-Allow-Origin: *');

// Por esta (reemplaza con tu dominio):
header('Access-Control-Allow-Origin: https://tu-app.com');
```

## ➕ Agregar Nuevo Contenido

### Para agregar una nueva arena:

1. Crea `arenas/nueva-arena.json` con la estructura correcta
2. Sube el archivo a `https://sora-system.com.ar/memoria/dmw/arena/nueva-arena.json`
3. ¡Listo! Aparecerá automáticamente en la app

### Para agregar un nuevo dungeon:

1. Crea `dungeons/nuevo-dungeon.json` con la estructura correcta
2. Sube el archivo a `https://sora-system.com.ar/memoria/dmw/dungeon/nuevo-dungeon.json`
3. ¡Listo! Aparecerá automáticamente en la app

## 🧪 Probar que Funciona

### 1. Verifica los archivos JSON:
```
https://sora-system.com.ar/memoria/dmw/arena/colo-hero.json
https://sora-system.com.ar/memoria/dmw/dungeon/vajiramon.json
```

### 2. Verifica los endpoints PHP:
```
https://sora-system.com.ar/memoria/dmw/arena/index.php
https://sora-system.com.ar/memoria/dmw/dungeon/index.php
```

Deberías ver un JSON con la lista de archivos disponibles.

## 🔮 Migración Futura a Base de Datos

Cuando quieras migrar a una base de datos, solo necesitas:

1. Modificar los archivos `index.php` para que consulten la BD en lugar de escanear archivos
2. Modificar o crear endpoints para servir los datos individuales desde la BD
3. La app React no necesita cambios

Ejemplo de `index.php` con BD:

```php
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Conectar a la base de datos
$pdo = new PDO('mysql:host=localhost;dbname=dmw', 'user', 'pass');

// Consultar arenas
$stmt = $pdo->query('SELECT id, name, description FROM arenas');
$arenas = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($arenas);
?>
```

## 📝 Notas Importantes

- Los archivos PHP requieren un servidor con PHP habilitado
- Los archivos `.htaccess` solo funcionan en servidores Apache
- Si usas Nginx, necesitarás configurar CORS en el archivo de configuración del servidor
- El cache está configurado a 5 minutos en `.htaccess`

## 🆘 Soporte

Si tienes problemas:
1. Verifica que PHP esté habilitado en tu hosting
2. Verifica permisos de archivos (644 para JSON, 755 para PHP)
3. Revisa los logs de error de PHP en tu hosting
4. Abre la consola del navegador (F12) para ver errores de CORS
