import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getFakeAirPollutionMap } from '../../services/airPollution';
import { getColor } from '../../hooks/airQualityRecommendations';
import './Map.css'
import useLocation from '../../hooks/useLocation';
import { PopupCard } from './PopupCard/PopupCard';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = () => {
  const [pollutionData, setPollutionData] = useState([]);

  const { location,  } = useLocation();

  useEffect(() => {
    const fetchPollutionData = async () => {
      const data = await getFakeAirPollutionMap();
      setPollutionData(data);
    };
    fetchPollutionData();
  }, []);

  if (!location.lat || !location.lon) {
    return (
        <p>Загрузка...</p>
    )
  }

  return (
    <div className='map-container'>
      <h2 className='map-container__title'>Карта загрязнения воздуха </h2>
      <MapContainer center={[location.lat, location.lon]} zoom={11} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {pollutionData.map((data, index) => (
          <Circle
            key={index}
            center={[data.lat, data.lon]}
            radius={data?.radius ? data.radius : 6000}
            pathOptions={{ color: getColor(data.aqi) }}
          >
            <Marker position={[data.lat, data.lon]}>
              <Popup>
                <PopupCard data={data}/>
              </Popup>
            </Marker>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
