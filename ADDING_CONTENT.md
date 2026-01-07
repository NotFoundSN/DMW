# 📝 Guía: Cómo Agregar Nuevas Arenas y Dungeons

## 🎯 Sistema Dinámico con PHP

El sistema usa archivos PHP que escanean automáticamente los directorios y generan la lista de arenas/dungeons disponibles. 

**Ventajas:**
- ✅ **Totalmente dinámico**: Solo subes el JSON y aparece automáticamente
- ✅ **Protegido con CORS**: Los PHP controlan el acceso
- ✅ **Fácil migración a BD**: Solo cambias el código PHP en el futuro
- ✅ **No expones estructura**: El PHP decide qué mostrar

---

## ➕ Agregar una Nueva Arena

### Paso 1: Crear el archivo JSON

Crea un nuevo archivo en `server-data/arenas/` con el nombre de tu arena (ej: `colo-rookie.json`):

```json
{
  "name": "Colo Rookie",
  "id": "colo-rookie",
  "floors": [
    {
      "floor": 1,
      "digimon": "Agumon",
      "attribute": "Vacuna",
      "element": "Fuego",
      "mechanics": [
        "Mecánica 1",
        "Mecánica 2"
      ]
    }
  ],
  "generalNotes": [
    {
      "title": "Nota 1",
      "desc": "Descripción"
    }
  ],
  "bugs": []
}
```

### Paso 2: Subir al servidor

Sube el archivo a tu servidor:
- `https://sora-system.com.ar/memoria/dmw/arena/colo-rookie.json`

**¡Eso es todo!** El archivo `index.php` lo detectará automáticamente.

### Paso 3: Verificar

1. Verifica que el JSON sea accesible:
   ```
   https://sora-system.com.ar/memoria/dmw/arena/colo-rookie.json
   ```

2. Verifica que aparezca en la lista:
   ```
   https://sora-system.com.ar/memoria/dmw/arena/index.php
   ```

3. Abre la app y debería aparecer en el selector

---

## ➕ Agregar un Nuevo Dungeon

### Paso 1: Crear el archivo JSON

Crea un nuevo archivo en `server-data/dungeons/` (ej: `beelzemon.json`):

```json
{
  "id": "beelzemon",
  "name": "Beelzemon",
  "description": "Dungeon con múltiples fases",
  "variants": [
    {
      "difficulty": "Normal",
      "generalMechanics": [
        "Mecánica general 1",
        "Mecánica general 2"
      ],
      "bosses": [
        {
          "name": "Beelzemon",
          "mechanics": [
            "🔴 80% HP: Mecánica 1",
            "🎯 50% HP: Mecánica 2",
            "⚡ 20% HP: Mecánica 3"
          ]
        }
      ]
    },
    {
      "difficulty": "Hard",
      "generalMechanics": [],
      "bosses": [
        {
          "name": "Beelzemon BM",
          "mechanics": [
            "Mecánicas más difíciles"
          ]
        }
      ]
    }
  ]
}
```

### Paso 2: Subir al servidor

Sube el archivo a tu servidor:
- `https://sora-system.com.ar/memoria/dmw/dungeon/beelzemon.json`

**¡Eso es todo!** El archivo `index.php` lo detectará automáticamente.

### Paso 3: Verificar

1. Verifica que el JSON sea accesible:
   ```
   https://sora-system.com.ar/memoria/dmw/dungeon/beelzemon.json
   ```

2. Verifica que aparezca en la lista:
   ```
   https://sora-system.com.ar/memoria/dmw/dungeon/index.php
   ```

3. Abre la app y debería aparecer en el selector

---

## 📋 Campos Disponibles

### Para Arenas:

```json
{
  "name": "Nombre visible",
  "id": "identificador-unico",
  "floors": [
    {
      "floor": 1,                    // Número de piso
      "digimon": "Nombre Digimon",   // Nombre del boss
      "attribute": "Data/Virus/Vacuna/Unknown",  // Atributo
      "element": "Fuego/Agua/Luz/Oscuridad/Viento/Tierra/Metal/Hielo/Rayo/Madera/Neutral",
      "mechanics": [
        "Lista de mecánicas del piso"
      ]
    }
  ],
  "generalNotes": [
    { "title": "Título", "desc": "Descripción" }
  ],
  "bugs": [
    { "title": "Título", "desc": "Descripción" }
  ]
}
```

### Para Dungeons:

```json
{
  "id": "identificador-unico",
  "name": "Nombre visible",
  "description": "Descripción breve",
  "variants": [
    {
      "difficulty": "Easy/Normal/Hard/SSS",
      "generalMechanics": [
        "Mecánicas generales del dungeon"
      ],
      "bosses": [
        {
          "name": "Nombre del Boss",
          "mechanics": [
            "Mecánicas específicas del boss"
          ]
        }
      ]
    }
  ]
}
```

---

## 🎨 Emojis Recomendados para Mecánicas

- 🔴 Para mecánicas de % HP
- 🎯 Para ataques target
- ☠️ Para venenos/debuffs
- ⚡ Para ataques especiales
- 👾 Para summons/invocaciones
- 💀 Para mecánicas de muerte instantánea
- 🛡️ Para buffs defensivos
- ⚔️ Para buffs ofensivos
- ⏰ Para mecánicas con tiempo
- 🔄 Para mecánicas cíclicas

---

## ✅ Checklist para Agregar Contenido

- [ ] Crear archivo JSON con los datos
- [ ] Asegurarse de que tenga los campos `id`, `name` y `description`
- [ ] Validar que el JSON sea válido (usar [jsonlint.com](https://jsonlint.com))
- [ ] Subir el archivo JSON al servidor
- [ ] Verificar en el navegador que el JSON sea accesible
- [ ] Verificar que aparezca en `index.php`
- [ ] Probar en la app que aparezca en el selector
- [ ] Verificar que los datos se muestren correctamente

---

## 🔍 Verificar que Funcione

1. **Verifica el JSON individual:**
   ```
   https://sora-system.com.ar/memoria/dmw/arena/tu-archivo.json
   ```

2. **Verifica que aparezca en el index PHP:**
   ```
   https://sora-system.com.ar/memoria/dmw/arena/index.php
   ```
   
   Deberías ver tu nuevo archivo en la lista JSON generada.

3. **Prueba en la app:**
   - Abre la app
   - El nuevo item debería aparecer en el selector
   - Selecciónalo y verifica que los datos se muestren

---

## 🐛 Troubleshooting

### No aparece en el selector

- Verifica que el archivo JSON tenga los campos `id`, `name` y `description`
- Verifica que el JSON sea válido (usa jsonlint.com)
- Verifica que `index.php` esté funcionando (ábrelo en el navegador)
- Limpia el cache del navegador (Ctrl + F5)

### Muestra error al seleccionar

- Verifica que el JSON sea válido
- Verifica que la estructura coincida con el formato esperado
- Revisa la consola del navegador para ver el error específico

### Datos desactualizados

- El cache es de 5 minutos
- Espera o limpia el cache del navegador
