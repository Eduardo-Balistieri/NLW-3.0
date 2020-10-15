import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Map, Marker, TileLayer } from 'react-leaflet'

import { FiClock, FiInfo } from 'react-icons/fi'
// import { FaWhatsapp } from 'react-icons/fa'

import styles from '../styles/pages/orphanage.module.css'
import Sidebar from '../components/Sidebar'
import { mapIcon } from '../utils/mapIcon'

import api from '../services/api';


interface Orphanage {
	latitude: number
	longitude: number
	name: string
	about: string
	instructions: string
	opening_hours: string
	open_on_weekends: boolean
	images: Array<{
		url: string
		id: number
	}>
}

interface OrphanageParams {
	id: string
}

const Orphanage = () => {

	const [orphanage, setOrphanage] = useState<Orphanage>()
	const [activeImageIndex, setActiveImageIndex] = useState(0)

	const params = useParams<OrphanageParams>()

	useEffect(() => {
		api.get(`/orphanages/${params.id}`)
			.then(response => {
				const orphanageData = response.data
				setOrphanage(orphanageData)
			})
	}, [params.id, setOrphanage])


	if (!orphanage)
		return <p>Loading...</p>


	return (
		<div id={styles.pageOrphanage}>
			<Sidebar />

			<main>
				<div className={styles.orphanageDetails}>
					<img src={orphanage.images[activeImageIndex].url} alt='Lar das meninas' />

					<div className={styles.images}>
						{orphanage.images.map((image, index) => (
							<button 
								className={activeImageIndex === index ? styles.active : ''}
								type='button' 
								key={image.id}
							>
								<img
									src={image.url}
									alt={orphanage.name}
									onClick={() => setActiveImageIndex(index)}
								/>
							</button>
						))}
					</div>

					<div className={styles.orphanageDetailsContent}>
						<h1>{orphanage.name}</h1>
						<p>{orphanage.about}</p>

						<div className={styles.mapContainer}>
							<Map
								center={[orphanage.latitude, orphanage.longitude]}
								zoom={16}
								style={{ width: '100%', height: 280 }}
								dragging={false}
								touchZoom={false}
								zoomControl={false}
								scrollWheelZoom={false}
								doubleClickZoom={false}
							>
								<TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
								<Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
							</Map>

							<footer>
								<a target='_blank' rel='noopener noreferrer' href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>
									Ver rotas no Google Maps
								</a>
							</footer>
						</div>

						<hr />

						<h2>Instruções para visita</h2>
						<p>{orphanage.instructions}</p>

						<div className={styles.openDetails}>
							<div className={styles.hour}>
								<FiClock size={32} color='#15B6D6' />
								Segunda à Sexta <br />
								{orphanage.opening_hours}
							</div>

							{orphanage.open_on_weekends ? (
								<div className={styles.openOnWeekends}>
									<FiInfo size={32} color='#39CC83' />
									Atendemos <br />
									fim de semana
								</div>
							) : (
								<div className={styles.closeOnWeekends}>
									<FiInfo size={32} color='#ff669d' />
									Não atendemos <br />
									fim de semana
								</div>
							)}
						</div>

						{/* <button type='button' className={styles.contactButton}>
							<FaWhatsapp size={20} color='#FFF' />
							Entrar em contato
						</button> */}
					</div>
				</div>
			</main>
		</div>
	);
}

export default Orphanage