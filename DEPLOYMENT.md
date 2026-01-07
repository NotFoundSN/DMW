# 📤 Guía Rápida: Subir Datos al Servidor

## ✅ Pasos para subir los archivos JSON a tu hosting

### 1️⃣ Preparar los archivos

Los archivos que debes subir están en la carpeta `server-data/`:

```
server-data/
├── .htaccess          ← Importante para CORS
├── arenas/
│   └── colo-hero.json
└── dungeons/
    └── vajiramon.json
```

### 2️⃣ Conectar al servidor

Usa un cliente FTP como:
- **FileZilla** (recomendado, gratis)
- **WinSCP** (Windows)
- O el gestor de archivos de tu hosting (cPanel, Plesk, etc.)

**Datos de conexión** (los proporciona tu hosting):
- Host/Servidor: `ftp.tu-dominio.com`
- Usuario: `tu-usuario-ftp`
- Contraseña: `tu-contraseña-ftp`
- Puerto: `21` (o el que te indiquen)

### 3️⃣ Crear la carpeta en el servidor

1. Navega a la carpeta pública de tu sitio:
   - Puede llamarse: `public_html/`, `www/`, `htdocs/`, o similar
   
2. Crea una nueva carpeta llamada `dmw-data`

### 4️⃣ Subir los archivos

Sube **TODO** el contenido de `server-data/` a la carpeta `dmw-data/`:

```
tu-servidor/public_html/dmw-data/
├── .htaccess          ← ¡No olvides este!
├── arenas/
│   └── colo-hero.json
└── dungeons/
    └── vajiramon.json
```

⚠️ **IMPORTANTE**: El archivo `.htaccess` debe estar en la raíz de `dmw-data/`

### 5️⃣ Verificar que funcione

Abre en tu navegador:

```
https://tu-dominio.com/dmw-data/arenas/colo-hero.json
```

Deberías ver el contenido del JSON. Si ves el JSON, ¡está funcionando! ✅

### 6️⃣ Configurar la app

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
VITE_API_BASE_URL=https://tu-dominio.com/dmw-data
```

### 7️⃣ Probar la app

```bash
npm run dev
```

La app debería cargar los datos desde tu servidor.

---

## 🔄 Para actualizar los datos en el futuro

1. Edita el archivo JSON que quieras actualizar (ej: `server-data/arenas/colo-hero.json`)
2. Sube el archivo actualizado por FTP a la misma ubicación
3. ¡Listo! Los cambios se verán en 5 minutos (cache)

---

## ❓ Problemas Comunes

### No veo el JSON en el navegador

- Verifica que la ruta sea correcta
- Asegúrate de que los archivos se subieron a la carpeta correcta
- Verifica permisos de archivos (deben ser legibles)

### Error de CORS

- Verifica que `.htaccess` esté en `dmw-data/`
- Si tu hosting no soporta `.htaccess`, contacta a soporte

### La app no carga los datos

- Verifica que `.env.local` tenga la URL correcta
- Abre la consola del navegador (F12) para ver errores
- Verifica que la URL del JSON sea accesible

---

## 📞 ¿Necesitas ayuda?

Si tienes problemas, revisa:
1. La consola del navegador (F12 → Console)
2. Que la URL del JSON sea accesible
3. Que `.htaccess` esté en su lugar
