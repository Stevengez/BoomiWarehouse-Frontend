# Utiliza una imagen base de Node para construir la aplicación
FROM node:20 AS builder

WORKDIR /app
# Copia el package.json y package-lock.json o yarn.lock
COPY . .

# Instala las dependencias
RUN npm install

# Construye la aplicación para producción
RUN npm run build

# Utiliza una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos de construcción de React desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html/app

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para que Nginx pueda servir la aplicación
EXPOSE 80

# Comando por defecto para ejecutar Nginx en el contenedor
CMD ["nginx", "-g", "daemon off;"]
