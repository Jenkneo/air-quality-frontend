# 1. Используем официальный Node.js образ как базовый
FROM node:18-alpine

# 2. Задаем рабочую директорию в контейнере
WORKDIR /app

# 3. Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# 4. Устанавливаем зависимости
RUN npm install

# 5. Копируем весь проект в контейнер
COPY . .

# 6. Собираем приложение для production
RUN npm run build

# 7. Используем Nginx для запуска нашего приложения
FROM nginx:1.23-alpine
COPY --from=0 /app/build /usr/share/nginx/html

# 8. Экспонируем порт 80 для доступа к приложению
EXPOSE 80

# 9. Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]