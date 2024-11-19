import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

const HeatMap = () => {
  const [data, setData] = useState([]);

  // Фиктивные данные (эмуляция ответа API)
  const mockData = [
    {
      coord: { lon: 48.008173, lat: 46.391984 },
      list: [
        {
          main: { aqi: 2 },
          components: {
            co: 243.66,
            no: 0,
            no2: 4.46,
            o3: 72.24,
            so2: 2.38,
            pm2_5: 13.91,
            pm10: 34.82,
            nh3: 0.16,
          },
          dt: 1732031902,
        },
      ],
    },
    {
      coord: { lon: 48.0477, lat: 46.3544 },
      list: [
        {
          main: { aqi: 3 },
          components: {
            co: 190.54,
            no: 0.02,
            no2: 3.18,
            o3: 60.12,
            so2: 1.45,
            pm2_5: 15.87,
            pm10: 40.11,
            nh3: 0.12,
          },
          dt: 1732031920,
        },
      ],
    },
    {
      coord: { lon: 48.035306, lat: 46.347808 },
      list: [
        {
          main: { aqi: 4 },
          components: {
            co: 320.22,
            no: 0.01,
            no2: 5.45,
            o3: 45.76,
            so2: 3.11,
            pm2_5: 20.15,
            pm10: 50.54,
            nh3: 0.14,
          },
          dt: 1732031950,
        },
      ],
    },
  ];

  useEffect(() => {
    // Обработка фиктивных данных
    const processMockData = () => {
      const heatData = mockData.flatMap((item) =>
        item.list.map((dataPoint) => [
          item.coord.lat, // Широта
          item.coord.lon, // Долгота
          dataPoint.main.aqi, // Индекс качества воздуха
        ])
      );

      setData(heatData);
    };

    processMockData();
  }, []);

  const HeatmapLayer = () => {
    const map = useMap();

    useEffect(() => {
      let heatLayer;

      const updateHeatLayer = () => {
        const currentZoom = map.getZoom();
        const adjustedRadius = 25 * (1 / Math.pow(2, 13 - currentZoom)); // Привязка радиуса к зуму

        if (heatLayer) {
          map.removeLayer(heatLayer);
        }

        // Создаем тепловую карту с фиксированными диапазонами для цвета
        heatLayer = L.heatLayer(data, {
          radius: adjustedRadius,
          blur: 15,
          maxZoom: 17,
          minOpacity: 0.3, // Минимальная прозрачность
          max: 5, // Максимальная интенсивность для отображения (например, AQI 5)
          gradient: {
            0.2: "blue", // Цвет для низких значений AQI
            0.4: "green", // Цвет для средних значений
            0.6: "yellow", // Цвет для выше среднего
            0.8: "orange", // Цвет для высоких значений
            1.0: "red", // Цвет для очень высоких значений
          },
        });

        map.addLayer(heatLayer);
      };

      // Первоначальное добавление слоя
      updateHeatLayer();

      // Обновление слоя при изменении масштаба
      map.on("zoomend", updateHeatLayer);

      return () => {
        if (heatLayer) {
          map.removeLayer(heatLayer);
        }
        map.off("zoomend", updateHeatLayer);
      };
    }, [data, map]);

    return null;
  };

  return (
    <MapContainer
      center={[46.2144, 48.0252]} // Центр карты (Астрахань)
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <HeatmapLayer />
    </MapContainer>
  );
};

export default HeatMap;