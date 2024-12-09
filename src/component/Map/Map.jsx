import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import IconMarker from '../../assets/marker.png';
import { country } from './utils';
import './style.css';

const Map = () => {

    return (
        <MapContainer center={[13, 1]} zoom={2.3} scrollWheelZoom={false} className='mapa' id='map'>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                subdomains='abcd'
                maxZoom='20'
            />
            {country.map((value, key) => (
                <Marker
                    key={key}
                    position={[value.latitud / 10000, value.longitud / 10000]}
                    icon={
                        icon({
                            className: `${value.classMarker ? value.classMarker : ''}`,
                            iconUrl: IconMarker,
                            iconSize: [12, 12]
                        })}
                >
                    {<Popup>{value.etiqueta}</Popup>}
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;