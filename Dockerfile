# -----------------------------------------------------------------------------
# ETAPA 1: Construcción (Build)
# Usamos Node 24 en su versión 'alpine' (más ligera)
# -----------------------------------------------------------------------------
FROM node:24-alpine as build

WORKDIR /app

# Copiamos primero los archivos de dependencias.
# El asterisco (*) permite copiar package-lock.json si existe.
COPY package*.json ./

# Instalamos las dependencias.
# 'npm ci' es más rápido y estricto que 'install', ideal para entornos limpios.
# Si no tienes package-lock.json, cambia 'npm ci' por 'npm install'.
RUN npm ci

# Copiamos el resto del código fuente
COPY . .

# Ejecutamos el script de build de Vite (genera la carpeta /dist)
RUN npm run build

# -----------------------------------------------------------------------------
# ETAPA 2: Servidor de Producción (Nginx)
# Aquí ya no necesitamos Node, solo un servidor web rápido.
# -----------------------------------------------------------------------------
FROM nginx:alpine

# Copiamos los archivos compilados desde la ETAPA 1 a la carpeta pública de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos tu configuración personalizada de Nginx
# (Asegúrate de tener el archivo nginx.conf en la raíz de tu proyecto)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80 (estándar web)
EXPOSE 80

# Iniciamos Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
