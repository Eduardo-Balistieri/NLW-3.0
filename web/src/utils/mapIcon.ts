import mapMarkerImg from '../images/map-marker.svg';
import Leaflet from 'leaflet';


export const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconAnchor: [29, 68],
    iconSize: [58, 68],
    popupAnchor: [175, 5]
})
