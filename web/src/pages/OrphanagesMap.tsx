import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import { FiPlus, FiArrowRight } from 'react-icons/fi'

import styles from '../styles/pages/orphanagesMap.module.css'
import mapMarker from '../images/map-marker.svg'
import { mapIcon } from '../utils/mapIcon'

import api from '../services/api'


interface Orphanage {
    id: number
    latitude: number
    longitude: number
    name: string
}

const OrphanagesMap = () => {

    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('/orphanages')
            .then(response => {
                const orphanagesData = response.data
                setOrphanages(orphanagesData)
            })
    }, [setOrphanages])

    return (
        <div id={styles.pageMap}>

            <aside>
                <header className={styles.header}>
                    <img src={mapMarker} alt='Happy' />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>


                <footer className={styles.footer}>
                    <strong>Erechim</strong>
                    <strong>Rio Grande do Sul</strong>
                </footer>
            </aside>

            <Map
                center={[-27.6393007, -52.2750797]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' /> */}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {orphanages.map(orphanage => (
                    <Marker
                        key={orphanage.id}
                        position={[orphanage.latitude, orphanage.longitude]}
                        icon={mapIcon}
                    >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className={`${styles.mapPopup} mapPopup`}>
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color='#fff' />
                            </Link>
                        </Popup>
                    </Marker>
                ))}
            </Map>


            <Link to='/orphanages/create' className={styles.createOrphanage}>
                <FiPlus size={32} color='#fff' />
            </Link>
        </div>
    )
}

export default OrphanagesMap
