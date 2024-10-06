# Информационную систему мониторинга качества воздуха
Developed by Stylua Inc (c) Developers
- [Jenkneo](https://github.com/Jenkneo)
- [nuafirytiasewo](https://github.com/nuafirytiasewo)

💻 Languages and Tools : ![Технологии](https://skillicons.dev/icons?i=js,html,css,react)

## Струтктура проекта
```
weather-app/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Map.jsx
│   │   ├── PollutionInfo.jsx
│   │   ├── Forecast.jsx
│   │   ├── Notifications.jsx
│   │   ├── SmokePrediction.jsx
│   │   ├── SafeLevels.jsx
│   │   └── News.jsx
│   ├── App.jsx
│   ├── index.js
│   └── styles/
│       └── GlobalStyles.jsx
├── package.json
└── README.md
```

## To-do

1.  **Определение города клиента**
*Делаем этот пункт на основе ручного выбора города*

2.  **Карта (чего?)**
*Карту отображать очень желательно, прогноз загрязнения опционально (можно сориентироваться на сезонные явления, типа наших вечных пожарищ)*

3.  **Отображении инфы о загрязнении разными веществами**

4.  **Новости (если возможно)**

5.  **Прогноз загрязнения на 7 дней**

6.  **Уведомления**

7.  **Прогнозирование задымленности (по пожарам можно сделать или задымленнсти)**
*Желательно обновлять каждый час, т.к. спутники не сразу все сканируют*

8.  **Предельно допустимые концентрации для людей с различными нарушениями здоровья**

## Open API's
- [cityair.ru](https://cityair.ru/ru/software/) - Можно использовать как ОДИН ИЗ источников данных, но это будет тянуть денежку
- [Microsoft Weather](https://learn.microsoft.com/ru-ru/rest/api/maps/weather/get-current-air-quality?view=rest-maps-2024-04-01&viewFallbackFrom=rest-maps-2023-06-01&tabs=HTTP) - можно использовать как один из источников данных.
- [AccuWeather](https://www.accuweather.com/ru/ru/moscow/294021/weather-forecast/294021) - можно использовать как один из источников данных.
- [aqi.in](https://www.aqi.in/ru/dashboard/russia) - с него можно стырить больше всего. Также используем как один из источников.
- [iqair](https://www.iqair.com/ru/) - неплох, но, есть ощущение, что он сам тоже откуда-то тянет данные.
- [iqicn](https://aqicn.org/here/ru/) - полностью бесплатный, но нужен прокси / vpn
- [Leadlet](https://leafletjs.com/) - провайдер карты

## Цель приложения
1. Сделать user-frendly UX&UI
2. Убрать все лишнее, что есть в других сервисах оставив самое нужное и важное. (Подробности по нужным подразделам, скрытым изначально)

## Запуск проекта
После скачивания просто установите все зависимости и запустите проект.
```
npm install && npm start
```
Проект пока не должен запустится потому что ничего нет
