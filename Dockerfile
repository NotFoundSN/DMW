# -----------------------------------------------------------------------------
# ETAPA 1: Construcción (Build)
# Usamos el mirror de Amazon para Node 24 (evita error 429 de Docker Hub)
# -----------------------------------------------------------------------------
FROM public.ecr.aws/docker/library/node:24-alpine AS build

WORKDIR /app

# Copiamos dependencias
COPY package*.json ./

# Instalamos
RUN npm ci

# Copiamos código y construimos
COPY . .
RUN npm run build

# -----------------------------------------------------------------------------
# ETAPA 2: Servidor de Producción (Nginx)
# Usamos el mirror de Amazon para Nginx también
# -----------------------------------------------------------------------------
FROM public.ecr.aws/docker/library/nginx:alpine

# Copiamos el build
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos la config de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
