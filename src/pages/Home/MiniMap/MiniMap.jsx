import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { NavLink } from 'react-router-dom';

import L from 'leaflet';
import './MiniMap.css'
import useLocation from '../../../hooks/useLocation';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MiniMap = () => {
  const { location,  } = useLocation();

  if (!location.lat || !location.lon) {
    return (
        <p>Загрузка...</p>
    )
  }

  return (
    <div className='minimap-container'>
      <NavLink to="/map">
        <MapContainer 
        center={[location.lat, location.lon]} 
        zoom={13} 
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        touchZoom={false}>
          
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.lat, location.lon]}>
          </Marker>
        </MapContainer>
      </NavLink>
    </div>
  );
};

export default MiniMap;
